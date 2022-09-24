import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from '@advanced-front/core/models/usuario.model';
import { UsersService } from './services/users.service';
import { setUsers } from './state/users.actions';
import { UsersState } from './state/users.state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public data!: Usuario[];
  public data$!: Observable<Usuario[] | null>;
  constructor(public _users: UsersService, private store: Store<UsersState>) {
    this.getData();
  }

  ngOnInit() {}

  ngOnDestroy(): void {}

  getData() {
    this.data$ = this._users.getUsers().pipe(take(1));
    this.data$.toPromise().then((users: Usuario[] | null) => {
      if (users) {
        this.store.dispatch(
          setUsers({
            users,
          })
        );
        this.data = users;
      }
    });
  }
}
