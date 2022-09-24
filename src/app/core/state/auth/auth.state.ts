import { Action, createReducer, on } from '@ngrx/store';

import { Id, Token, Usuario } from '@advanced-front/core/models';
import { setUser, unUser } from './auth.actions';

export interface IAuthState {
  user: Usuario | null;
  id: Id;
  token: Token;
}

export const initialState: IAuthState = {
  user: null,
  id: null,
  token: null,
};

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, { user, token, id }) => ({ ...state, user, token, id })),
  on(unUser, state => ({ ...state, user: null, token: null, id: null }))
);

export function authReducer(state: any, action: Action) {
  return _authReducer(state, action);
}
