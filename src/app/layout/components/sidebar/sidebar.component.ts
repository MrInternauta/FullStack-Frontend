import { Component, OnInit } from '@angular/core';

import { AuthService } from '@advanced-front/auth/services';
import { SidebarService } from '@advanced-front/layout/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(public _sidebar: SidebarService, public UsuarioSer: AuthService) {}

  ngOnInit() {}
}
