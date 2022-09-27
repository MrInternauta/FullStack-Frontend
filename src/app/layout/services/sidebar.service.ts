import { Injectable } from '@angular/core';

import { UsuarioRoles } from '@advanced-front/core';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-home',
      subMenu: [{ titulo: 'Dashboard', url: '/dashboard' }],
    },
  ];

  constructor(private _user: AuthService) {
    if (this._user && this._user.usuario && this._user.usuario.idRol == UsuarioRoles.ADMIN) {
      this.menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-home',
          subMenu: [
            { titulo: 'Dashboard', url: '/dashboard' },
            { titulo: 'Usuarios', url: '/users' },
            { titulo: 'Categorias', url: '/tasks' },
          ],
        },
      ];
    }
  }
}
