import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '@advanced-front/services';
import { SidebarService } from '@advanced-front/services/shared/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(public _sidebar: SidebarService, public UsuarioSer: UsuarioService) {}

  ngOnInit() {}
}
