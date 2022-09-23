import { ActionReducerMap } from '@ngrx/store';

import * as auth from './auth/auth.state';
import * as ui from './ui/ui.state';

export interface AppState {
  ui: ui.State;
  userSesion: auth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  userSesion: auth.authReducer,
};
