import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Usuario } from '@advanced-front/core/models/usuario.model';
import { UsuarioService } from '@advanced-front/services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public users!: Usuario[];
  constructor(public _usuario: UsuarioService) {}

  ngOnInit() {
    const headers = {
      Authorization: 'Bearer ' + this._usuario.token,
    };
    this._usuario.http.get(environment.url + 'users/', { headers }).subscribe(
      (data: Usuario[] | any) => {
        this.users = data;
        console.log(data);
      },
      (e: any) => {
        console.log(e);
      }
    );
  }
}
