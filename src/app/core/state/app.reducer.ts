import { ActionReducerMap } from '@ngrx/store';

import * as auth from '../../auth/state/auth.state';
import * as ui from '../../layout/state/ui.state';
import * as users from '../../pages/users/state/users.state';

export interface AppState {
  ui: ui.IUIState;
  users: users.UsersState;
  userSesion: auth.IAuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  userSesion: auth.authReducer,
  users: users.usersReducer,
};
