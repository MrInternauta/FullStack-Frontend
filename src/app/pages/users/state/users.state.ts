import { Action, createReducer, on } from '@ngrx/store';

import { Usuario } from '@advanced-front/core';
import { removeUsers, setUsers } from './users.actions';

export const usersFeatureKey = 'users';
export interface UsersState {
  [usersFeatureKey]: Usuario[] | null;
}

const initialState: UsersState = {
  [usersFeatureKey]: null,
};

const _usersReducer = createReducer(
  initialState,
  on(setUsers, (state, { users }) => ({ ...state, [usersFeatureKey]: users })),
  on(removeUsers, state => ({ ...state, [usersFeatureKey]: null }))
);

export function usersReducer(state: any, action: Action) {
  return _usersReducer(state, action);
}
