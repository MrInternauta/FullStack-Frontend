import { createReducer, on } from '@ngrx/store';

import { Id, Token, Usuario } from '@advanced-front/core/models';
import { setUser, unUser } from './auth.actions';

export interface State {
  user: Usuario | null;
  id: Id;
  token: Token;
}

export const initialState: State = {
  user: null,
  id: null,
  token: null,
};

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, { user, id, token }) => ({ ...state, user, token, id })),
  on(unUser, state => ({ ...state, user: null, token: null, id: null }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
