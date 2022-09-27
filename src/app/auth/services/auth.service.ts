import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { setUser, unUser } from '@advanced-front/auth/state/auth.actions';
import { AppState } from '@advanced-front/core';
import { Usuario } from '../../core/models/usuario.model';
import { IAuthState } from '../state';

const API_URL = `/api/users/`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _auth!: IAuthState;
  public Swal = Swal;

  constructor(public http: HttpClient, public router: Router, private store: Store<AppState>) {
    this.loadStorage();
    this.store.select('userSesion').subscribe(auth => {
      this._auth = auth;
    });
  }

  get usuario() {
    return this._auth.user;
  }

  get token() {
    return this._auth.token;
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

  loadStorage() {
    let localStorageAuth = {
      token: localStorage.getItem('token'),
      user: localStorage.getItem('usuario'),
    };

    if (localStorageAuth.user && localStorageAuth.token) {
      // this.token = localStorageAuth.token;
      const user: Usuario = JSON.parse(localStorageAuth.user);
      if (!user) {
        return;
      }
      this.store.dispatch(setUser({ user, id: user.id || '', token: localStorageAuth.token }));
    }
  }

  GuardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.store.dispatch(setUser({ user: usuario, id, token }));

    // this.usuario = usuario;
    // this.token = token;
  }

  Login(usuario: Usuario, recordar = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.Auth(usuario.email, usuario.password).pipe(
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
    usuario.idRol = 2;
    return this.Register(usuario).pipe(
      map(
        (data: any) => {
          if (!data || !data.name) {
            throw new Error('Error al crear!');
          }

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

  Auth(email: string, password: string) {
    return this.http.post(`${API_URL}auth`, { email, password });
  }

  Register(usuario: Usuario) {
    return this.http.post(`${API_URL}registerAccount`, usuario);
  }

  async HaveSession() {
    let session = await this.store.select('userSesion').pipe(take(1)).toPromise();
    return session.id != null && session.token != null && session.user != null;
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    // this.usuario = null;
    // this.token = '';

    this.store.dispatch(unUser());
    location.reload();
  }
}
