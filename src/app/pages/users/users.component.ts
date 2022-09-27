import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { AppState } from '@advanced-front/core';
import { Usuario } from '@advanced-front/core/models/usuario.model';
import { UsersService } from './services/users.service';
import { setUsers } from './state/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public data!: Usuario[];
  constructor(public _users: UsersService, private store: Store<AppState>) {
    this.store
      .select('users')
      .pipe()
      .pipe(take(1))
      .toPromise()
      .then((store: { users: any }) => {
        if (store.users == null) {
          this.getData();
        } else {
          this.data = store.users;
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy(): void {}

  trackItems(index: number, user: Usuario): string {
    return user.email;
  }

  getData() {
    this._users
      .getUsers()
      .pipe(take(1))
      .toPromise()
      .then((users: Usuario[]) => {
        this.store.dispatch(
          setUsers({
            users,
          })
        );
        this.data = users;
      });
  }
}
