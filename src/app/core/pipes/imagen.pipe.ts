import { Pipe, PipeTransform } from '@angular/core';

import { AuthService } from '@advanced-front/auth/services';
import { API_PREFIX } from '../constants';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  constructor(private _Usuario: AuthService) {}

  transform(img: string, tipo: string = 'usuario'): any {
    let url = API_PREFIX + 'imagen/';
    if (!img) {
      return 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png';
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (tipo) {
      case 'usuario':
        url += `usuarios/${img}?token=${this._Usuario.token}`;
        break;
      case 'participante':
        url += `participante/${img}?token=${this._Usuario.token}`;
        break;
      default:
        console.log('Tipo de imagen no existe');
        return url + `usuarios/xxx?token=${this._Usuario.token}`;
    }
    return url;
  }
}
