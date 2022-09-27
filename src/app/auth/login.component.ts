import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState, ComponentBase, Usuario } from '@advanced-front/core';
import { isLoading, stopLoading } from '@advanced-front/layout/state';
import { UsuarioService } from './services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends ComponentBase implements OnInit, OnDestroy {
  email: string = '';
  recuerdame = false;
  auth2: any;
  loading!: boolean;
  uiSubscription!: Subscription;
  constructor(public _UsuarioService: UsuarioService, public router: Router, private store: Store<AppState>) {
    super();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 3) {
      this.recuerdame = true;
    }
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  Login(forma: NgForm) {
    if (!this.validInput(forma)) {
      return;
    }
    this.store.dispatch(isLoading());
    let { email, password, recuerdame } = forma.value;
    const usuario = new Usuario('', email, password, undefined, undefined, undefined, undefined, undefined);

    this._UsuarioService.Login(usuario, recuerdame).subscribe(
      () => {
        this.store.dispatch(stopLoading());
        window.location.href = '/dashboard';
      },
      e => {
        console.log(e);
        this.store.dispatch(stopLoading());
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
