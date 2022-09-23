import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '@advanced-front/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(public UsuarioSer: UsuarioService) {}

  ngOnInit() {}
}
