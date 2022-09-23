import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UsuarioService } from '@advanced-front/services';
import { Usuario } from '../core/models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
  forma!: UntypedFormGroup;

  constructor(public _UsuarioService: UsuarioService, public router: Router) {
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
  }

  ngOnInit() {}

  passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('password2');
    console.log(password, confirmPassword, this.forma);

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
    let { name, email, password } = this.forma.value;
    const usuario = new Usuario(name, email, password);
    console.log(usuario);

    this._UsuarioService.RegistrarUsuario(usuario).subscribe(
      (resp: any) => {
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
