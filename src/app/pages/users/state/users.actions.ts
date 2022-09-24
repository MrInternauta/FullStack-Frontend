import { createAction, props } from '@ngrx/store';

import { Usuario } from '@advanced-front/core';

export const setUsers = createAction('[Users] setUsers', props<{ users: Usuario[] }>());
export const removeUsers = createAction('[Users] removeUsers');
