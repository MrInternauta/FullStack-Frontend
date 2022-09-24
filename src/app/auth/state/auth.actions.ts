import { createAction, props } from '@ngrx/store';

import { Id, Token, Usuario } from '@advanced-front/core/models';

export const setUser = createAction('[Auth] setUser', props<{ user: Usuario; id: Id; token: Token }>());

export const unUser = createAction('[Auth] unUser');
