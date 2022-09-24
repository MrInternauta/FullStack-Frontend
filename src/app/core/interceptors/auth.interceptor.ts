import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { IAuthState } from '@advanced-front/auth/state/auth.state';
import { environment } from '@advanced-front/environment';
import { API_PREFIX, IGNORE_ERROR } from '../constants';
import { Token } from '../models';
import { AppState } from '../state';
import { StatusCodes } from '../util';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  userSesion$!: Observable<IAuthState>;
  headers!: HttpHeaders;
  token!: Token;
  constructor(public http: HttpClient, private store: Store<AppState>) {
    this.userSesion$ = this.store.select('userSesion');
    this.userSesion$.pipe(take(1)).subscribe((sesionState: IAuthState) => {
      this.token = sesionState.token;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const originalUrl = request.url;
    const isApiUrl = this.isApiUrl(originalUrl);
    if (isApiUrl) {
      request = request.clone({
        url: this.rewriteUrl(originalUrl),
      });
      request = this.addTokenHeader(request);
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === StatusCodes.UNAUTHORIZED) {
            // check for unauthorized error and redirect to login page.
            this.redirect();
            return throwError(IGNORE_ERROR);
          }

          if (error.status === StatusCodes.FORBIDDEN) {
            // Sentry.captureMessage(`Received forbidden response to request ${request.url}`);
            const account = error.headers.get('X-Account');
            if (account) {
              // Either the user does not have access to the specified account or the account auth has expired
              // TODO: Reprompt?
            }
          }
        }

        return throwError(error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>) {
    if (this.token) {
      const setHeaders: { [name: string]: string } = {
        Authorization: `Bearer ${this.token}`,
      };
      return request.clone({ setHeaders });
    }
    return request;
  }

  protected isApiUrl(url: string) {
    return url.indexOf(API_PREFIX) === 0;
  }

  protected rewriteUrl(url: string) {
    return environment.url + url;
  }

  redirect(): void {
    // this._store.dispatch(new SignIn());
  }
}
