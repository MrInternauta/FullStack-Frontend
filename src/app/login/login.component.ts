import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '@advanced-front/services';
import { Usuario } from '../core/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  recuerdame = false;
  auth2: any;
  constructor(public _UsuarioService: UsuarioService, public router: Router) {}

  ngOnInit() {
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 3) {
      this.recuerdame = true;
    }
  }

  Login(forma: NgForm) {
    if (!this.validInput(forma)) {
      return;
    }
    let { email, password, recuerdame } = forma.value;
    const usuario = new Usuario('', email, password, undefined, undefined, undefined, undefined, undefined);

    this._UsuarioService.Login(usuario, recuerdame).subscribe(
      ok => {
        window.location.href = '/dashboard';
      },
      e => {
        console.log(e);
        this._UsuarioService.Swal.fire(
          `Error al  iniciar sesión!`,
          `Correo electrónico ó contraseña incorrecto`,
          'warning'
        );
      }
    );
  }

  validInput(forma: NgForm) {
    if (forma.invalid) {
      this._UsuarioService.Swal.fire(`Error al  iniciar sesión!`, '', 'warning');
      return false;
    }

    let { email, password } = forma.value;
    if (!this._UsuarioService.validateEmail(email) || !this._UsuarioService.validatePassword(password)) {
      return false;
    }
    return true;
  }

  resetPassword() {
    this._UsuarioService.Swal.fire(`Muy pronto`, ``, 'info');
  }
}
