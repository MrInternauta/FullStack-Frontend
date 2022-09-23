import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { AppState, setUser, unUser } from '@advanced-front/core';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../core/models/usuario.model';
import { SubirarhivoService } from '../subirarchivo/subirarhivo.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: any;
  token!: string;
  public Swal = Swal;

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirarchivo: SubirarhivoService,
    private store: Store<AppState>
  ) {
    this.CargarStorage();
    console.log(environment.url);
  }

  /**
   * @author Felipe De Jesus
   * @function validatePassword
   * @description Valida password
   * @returns { boolean }
   *
   */
  validatePassword(password: string) {
    if (!password) {
      this.Swal.fire(`Error al  iniciar sesión!`, `Ingrese todos los campos`, 'warning');
      return false;
    }
    if (password.length > 200) {
      this.Swal.fire(`Error al  iniciar sesión!`, `La logitud de la contraseña es muy grande`, 'warning');
      return false;
    }
    return true;
  }

  /**
   * @author Felipe De Jesus
   * @function validateEmail
   * @description Validar el formato del email
   * @returns { boolean }
   *
   */
  validateEmail(email: string) {
    if (!email) {
      this.Swal.fire(`Error al  iniciar sesión!`, `Ingrese todos los campos`, 'warning');
      return false;
    }

    if (email.length > 45) {
      this.Swal.fire(`Error al  iniciar sesión!`, `La logitud del correo es muy grande`, 'warning');
      return false;
    }

    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  CargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token') || '';
      this.usuario = JSON.parse(localStorage.getItem('usuario') || '');
      this.store.dispatch(setUser({ user: this.usuario, id: this.usuario.id, token: this.token }));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  GuardarStorage(id: string, token: string, usuario: Usuario) {
    this.store.dispatch(setUser({ user: usuario, id, token }));
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  EstaLogueado() {
    return this.token.length > 5 ? true : false;
  }
  Logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    this.store.dispatch(unUser());
    location.reload();
  }
  Login(usuario: Usuario, recordar = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http
      .post(environment.url + 'users/auth', {
        email: usuario.email,
        password: usuario.password,
      })
      .pipe(
        map((resp: any) => {
          if (resp && resp.jwt && resp.user) {
            this.GuardarStorage(resp.user.id, resp.jwt, resp.user);
            return true;
          }
          Swal.fire(`Error al  iniciar sesión!`, `Correo electrónico ó contraseña incorrecto`, 'warning');
          return false;
        })
      );
  }

  RegistrarUsuario(usuario: Usuario) {
    usuario.createdAt = new Date();
    usuario.idRol = null;
    return this.http.post(environment.url + 'users/registerAccount', usuario).pipe(
      map(
        (data: any) => {
          Swal.fire(`Usuario creado!`, `${data.name} creado correctamente!`, 'success');
          return data;
        },
        (e: any) => {
          Swal.fire(`Error al crear!`, ``, 'warning');
          return;
        }
      )
    );
  }

  ActualizarUsuario(usuario: Usuario) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    console.log(headers, usuario);

    return this.http
      .put(
        environment.url + 'users/' + this.usuario.id,
        {
          ...this.usuario,
          name: usuario.name.slice(0, 99),
        },
        {
          headers,
        }
      )
      .pipe(
        map((data: any) => {
          console.log(data);

          if (!data.id) {
            Swal.fire(`Error al actualizar!`, ``, 'warning');
            return;
          }
          Swal.fire(`Usuario actualizado!`, ``, 'success');
          this.GuardarStorage(data.id, this.token, data);
          return true;
        })
      );
  }
}
