import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../auth/services/usuario.service';
import { UsuarioRoles } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardGuard implements CanActivate {
  constructor(public _UsuarioService: UsuarioService, public router: Router) {}
  canActivate() {
    if (
      this._UsuarioService.EstaLogueado() &&
      this._UsuarioService.usuario &&
      this._UsuarioService.usuario.idRol === UsuarioRoles.ADMIN
    ) {
      return true;
    } else {
      Swal.fire(`Sin acceso!`, `Necesita ser administrador!`, 'warning');
      setTimeout(() => {
        2;
      }, 1500);
      return false;
    }
  }
}
