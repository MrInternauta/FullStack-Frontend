import { Injectable } from '@angular/core';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-home',
      subMenu: [
        {titulo: 'Dashboard', url: '/dashboard'},
      ]
    }
  ];

  constructor(private _user: UsuarioService) {
    if (this._user &&   this._user.usuario &&  this._user.usuario.role === 'ADMIN_ROLE') {
      this.menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-home',
          subMenu: [
            {titulo: 'Dashboard', url: '/dashboard'},
            {titulo: 'Usuarios', url: '/users'},
            {titulo: 'Categorias', url: '/categoria'}
          ]
        }
      ];
    }
   }
}