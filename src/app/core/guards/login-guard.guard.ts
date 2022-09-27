import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@advanced-front/auth/services';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
  constructor(public _UsuarioService: AuthService, public router: Router) {}
  async canActivate() {
    if (await this._UsuarioService.HaveSession()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
