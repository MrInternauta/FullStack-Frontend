import { Usuario } from '@advanced-front/core';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { loadedUsersType, loadUsersType } from './users.actions';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersType),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map(users => ({ type: loadedUsersType, payload: users })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
