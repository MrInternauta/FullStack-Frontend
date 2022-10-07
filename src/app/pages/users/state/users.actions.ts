import { createAction, props } from '@ngrx/store';

import { Usuario } from '@advanced-front/core';

export const removeUsers = createAction('[Users] removeUsers');

export const loadUsersType = '[Users] loadUsers Success';
export const loadUsers = createAction(loadUsersType);

export const loadedUsersType = '[Users] Loaded Users Success';
export const loadedUsers = createAction(loadedUsersType, props<{ users: Usuario[] }>());
