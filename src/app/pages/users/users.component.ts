import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import { AppState } from '@advanced-front/core';
import { Usuario } from '@advanced-front/core/models/usuario.model';
import { UsersService } from './services/users.service';
import { loadUsers } from './state/users.actions';
import { Observable } from 'rxjs';
import { selectListUsers } from './state/users.selector';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  data$: Observable<Usuario[] | null> = this.store.select(selectListUsers);

  constructor(public _users: UsersService, private store: Store<AppState>) {
    this.store.dispatch(loadUsers());
  }

  ngOnInit() {}
  trackItems(index: number, user: Usuario): string {
    return user.email;
  }
}
