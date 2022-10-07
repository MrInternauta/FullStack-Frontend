import { AppState, Usuario } from '@advanced-front/core';
import { createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { usersFeatureKey, UsersState } from './users.state';

export interface FeatureState {
  counter: number;
}

export const selectUsersFeature = (state: AppState) => state.users;

//concatename selectors
export const selectListUsers: MemoizedSelector<
  AppState,
  Usuario[] | null,
  DefaultProjectorFn<Usuario[] | null>
> = createSelector(selectUsersFeature, (state: UsersState) => state[usersFeatureKey]);

export const selectNamesList = createSelector(selectListUsers, users => users?.map(user => user.name));
