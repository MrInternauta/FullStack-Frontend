import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NEVER, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, publishReplay, refCount, switchMap, tap } from 'rxjs/operators';

import { KeyedObject, StatusCodes } from '@advanced-front/util';
import { CurrentUserAccount, SYSTEM_ADMIN, UserInfo } from '../../models';
import { RouteUrls } from '../../route-urls';
import { CurrentRoleService, LogService, NotificationService, OAuthService } from '../../services';
import { ANONYMOUS, UserInfoService } from '../../services/user-info.service';
import {
  CompleteAuthentication,
  GetUserInfo,
  InvalidateSession,
  LoggedIn,
  LogOut,
  PromptAuthAction,
  RedirectToSystem,
  SignIn,
  UpdateUserInfo,
  UserResolved,
} from './auth.actions';

import type { User } from 'oidc-client';
/**
 * Converts the model to an object whose properties won't be serialized. This will prevent
 * the auth information from ending up in storage.
 * @param data The original plain object containing the auth data
 */
function makeNotSerializable<T extends KeyedObject<any>>(data: T) {
  const target = {};
  const keys: string[] = Object.keys(data);
  for (const prop of keys) {
    Object.defineProperty(target, prop, {
      value: data[prop],
      configurable: false,
      enumerable: false,
      writable: false,
    });
  }
  return Object.freeze(target) as T;
}

enum AuthStateLevel {
  Unauthenticated = 0,
  Authenticated = 1,
  Tenant = 2,
  System = 100,
}

export interface AuthStateModel {
  user: UserInfo;
  account: CurrentUserAccount | null;
  impersonated: boolean;
}

const DEFAULTS: AuthStateModel = {
  user: ANONYMOUS,
  account: null,
  impersonated: false,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: DEFAULTS,
  // children: [TodoState]
})
@Injectable()
export class AuthState {
  private _inFlightRequest: Observable<any> | null = null;
  private _isUserResolved = false;
  private _notificationService?: NotificationService;

  get notificationService() {
    if (!this._notificationService) {
      this._notificationService = this._injector.get(NotificationService);
    }
    return this._notificationService;
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state?.user ?? null;
  }

  @Selector()
  static account(state: AuthStateModel) {
    return state?.account ?? null;
  }

  @Selector()
  static impersonated(model: AuthStateModel) {
    return model?.impersonated ?? null;
  }

  @Selector([AuthState.authStateLevel])
  static isAuthenticated(level: AuthStateLevel) {
    return level === AuthStateLevel.Authenticated;
  }

  @Selector([AuthState.authStateLevel])
  static isAnonymous(level: AuthStateLevel) {
    return level === AuthStateLevel.Unauthenticated;
  }

  @Selector([AuthState.authStateLevel])
  static isTenantUser(level: AuthStateLevel) {
    return level === AuthStateLevel.Tenant;
  }

  @Selector([AuthState.authStateLevel])
  static isSystemUser(level: AuthStateLevel) {
    return level === AuthStateLevel.System;
  }

  @Selector([AuthState.user])
  private static authStateLevel(user: UserInfo) {
    if (user) {
      if (user.id) {
        return AuthStateLevel.Tenant;
      }

      if (user.systemUserId) {
        // user.role === SYSTEM_ADMIN
        return AuthStateLevel.System;
      }
    }

    return AuthStateLevel.Unauthenticated;
  }

  @Selector([AuthState.user])
  static fullName(user: UserInfo) {
    return user?.name ?? null;
  }

  @Selector([AuthState.user])
  static role(user: UserInfo) {
    return user?.role ?? null;
  }

  @Selector([AuthState.user])
  static usernameAndRole(user: UserInfo) {
    return user ? `${user.username}/${user.role}` : null;
  }

  @Selector([AuthState.user])
  static companyLogo(user: UserInfo) {
    return user?.companyLogo ?? null;
  }

  constructor(
    private _authService: OAuthService,
    private _userInfoService: UserInfoService,
    private _currentRoleService: CurrentRoleService,
    private _injector: Injector,
    private _logService?: LogService
  ) {}

  @Action(LoggedIn)
  loggedIn({ dispatch }: StateContext<AuthStateModel>, { returnUrl }: LoggedIn) {
    dispatch(new Navigate([RouteUrls.Auth.REDIRECT], { returnUrl }));
  }

  @Action(LogOut)
  logOut(_: StateContext<AuthStateModel>) {
    return this._authService.logOut();
  }

  @Action(InvalidateSession)
  invalidateSession(_: StateContext<AuthStateModel>) {
    // Force the auth info to be re-evaluated next time
    this._inFlightRequest = null;
    this._isUserResolved = false;
  }
  /*
    @Action([LoggedIn, RevalidateSession])
    enableRefresh(_: StateContext<AuthStateModel>, action: LoggedIn | RevalidateSession) {
      const SHORT_DELAY = 60 * 1000; // 1 minute
      const LONG_DELAY = SHORT_DELAY * 60;

      const actionType = getActionTypeFromInstance(action);
      // If the user just logged in, it is safe to delay refreshing time a little bit more
      const refreshIn = actionType === LoggedIn.type ? LONG_DELAY : SHORT_DELAY;
      this._refreshTicketService.start(refreshIn);
    }

    @Action([LogOut, InvalidateSession])
    disableRefresh() {
      this._refreshTicketService.stop();
    }
  */
  @Action(GetUserInfo)
  getUserInfo({ setState, dispatch }: StateContext<AuthStateModel>) {
    if (this._isUserResolved) {
      return of(true);
    }

    if (!this._inFlightRequest) {
      this._inFlightRequest = this._userInfoService.getUserInfo().pipe(
        finalize(() => {
          // No matter what the result (success/error), we set this flag
          // so the call is not repeated until the session is refreshed
          this._isUserResolved = true;
          this._inFlightRequest = null;
        }),
        switchMap((user: UserInfo) => {
          if (user === ANONYMOUS || user.role === SYSTEM_ADMIN) {
            return of({ user, account: null });
          }

          return this._userInfoService.getAccount().pipe(map(account => ({ user, account })));
        }),
        tap(({ user, account }) => {
          this.setUser(setState, { user, impersonated: false, account });
          this._currentRoleService.set(user.role ?? null);
          dispatch(new UserResolved(user));
        }),
        catchError((error: HttpErrorResponse) => {
          // If this call throws, the user has a token that is expired
          // We need to run the flow to re-authenticate or refresh the token
          if (error.status === StatusCodes.UNAUTHORIZED) {
            dispatch(new SignIn());
            // Return NEVER so the source observable (auth guard) does not resolve
            // And the SignIn action is handled
            return NEVER;
          }
          return throwError(error);
        }),
        publishReplay(1),
        refCount()
      );
    }

    return this._inFlightRequest;
  }

  @Action(UpdateUserInfo)
  updateUserInfo({ setState, getState }: StateContext<AuthStateModel>, { payload }: UpdateUserInfo) {
    return this._userInfoService.updateInfo(payload).pipe(
      tap(user => {
        this.notificationService.success('@account-settings.company.SUCCESS');
        const { impersonated, account } = getState();
        this.setUser(setState, { user, impersonated, account });
      })
    );
  }

  @Action(SignIn)
  signIn(_: StateContext<AuthStateModel>, { payload }: SignIn) {
    return this._authService.signIn(payload);
  }

  @Action(CompleteAuthentication)
  completeAuthentication({ dispatch }: StateContext<AuthStateModel>) {
    return this._authService.completeLogin().pipe(
      switchMap((user: User) => {
        const returnUrl = typeof user?.state === 'string' ? user.state : null;
        // console.log(user);
        return dispatch(new LoggedIn(returnUrl));
      })
    );
  }

  @Action(PromptAuthAction)
  promptAuthAction({ dispatch }: StateContext<AuthStateModel>, { returnUrl }: PromptAuthAction) {
    dispatch(new Navigate([RouteUrls.Auth.PROMPT], { returnUrl }, { skipLocationChange: true }));
  }

  private setUser(setState: (value: AuthStateModel) => AuthStateModel, model: AuthStateModel) {
    setState(makeNotSerializable(model));
    if (model.user === ANONYMOUS) {
      this._logService?.setUser(null);
      return;
    }

    this._logService?.setUser({
      id: model.user.id || model.user.systemUserId,
      email: model.user.email,
    });
  }

  @Action(RedirectToSystem)
  redirectToSystem({ dispatch }: StateContext<AuthStateModel>) {
    return dispatch(new Navigate([RouteUrls.SYSTEM]));
  }
}
