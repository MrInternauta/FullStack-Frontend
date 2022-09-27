import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { AppState, ComponentBase } from '@advanced-front/core';
import { Usuario } from '@advanced-front/core/models';
import { isLoading, stopLoading } from '@advanced-front/layout/state';
import { AuthService } from './services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent extends ComponentBase implements OnInit, OnDestroy {
  forma!: UntypedFormGroup;
  uiSubscription!: Subscription;
  loading!: boolean;

  constructor(public _UsuarioService: AuthService, public router: Router, private store: Store<AppState>) {
    super();
    this.forma = new UntypedFormGroup(
      {
        name: new UntypedFormControl(null, [Validators.required, Validators.min(3), Validators.maxLength(45)]),
        email: new UntypedFormControl(null, [
          Validators.required,
          Validators.email,
          Validators.min(3),
          Validators.maxLength(45),
        ]),
        password: new UntypedFormControl(null, [Validators.required, Validators.min(6), Validators.maxLength(45)]),
        password2: new UntypedFormControl(null, [Validators.required, Validators.min(6), Validators.maxLength(45)]),
        termino: new UntypedFormControl(false),
      },
      { validators: this.passwordMatchingValidatior }
    );
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('password2');
    return password?.value === confirmPassword?.value ? null : { notmatched: true };
  };

  validInput(forma: UntypedFormGroup) {
    if (forma.invalid) {
      return false;
    }

    let { email, password, termino } = forma.value;
    if (!this._UsuarioService.validateEmail(email) || !this._UsuarioService.validatePassword(password)) {
      return false;
    }
    if (!termino) {
      Swal.fire('Importante!', 'Debe aceptar las condiciones!', 'warning');
      return;
    }
    return true;
  }

  RegistrarUsuario() {
    if (!this.validInput(this.forma)) {
      return;
    }
    this.store.dispatch(isLoading());
    let { name, email, password } = this.forma.value;
    const usuario = new Usuario(name, email, password);

    this._UsuarioService.RegistrarUsuario(usuario).subscribe(
      () => {
        this.store.dispatch(stopLoading());
        this.router.navigate(['/login']);
      },
      error => {
        this.store.dispatch(stopLoading());
        console.log(error);
        this._UsuarioService.Swal.fire(`Error al  registrar!`, `Campos incorrectos`, 'warning');
      }
    );
  }
}
