import { Component, OnInit } from '@angular/core';

import { AuthService } from '@advanced-front/auth/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(public UsuarioSer: AuthService) {}

  ngOnInit() {}
}
