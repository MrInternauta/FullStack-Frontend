import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthService } from '@advanced-front/auth/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  usuario: any;
  imagenTemp: any;
  ImagenSubir!: File;
  constructor(public _usuario: AuthService) {}

  ngOnInit() {
    this.usuario = this._usuario.usuario;
  }
  Guardar(f: any) {
    return;
    // this._usuario.ActualizarUsuario(new Usuario(f.nombre, '', '', null, null, null, null)).subscribe(
    //   () => {},
    //   error => {
    //     Swal.fire(`Error al actualizar!`, ``, 'warning');
    //   }
    // );
  }
}
