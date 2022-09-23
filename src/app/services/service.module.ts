import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AdminGuardGuard } from '@advanced-front/core/guards/admin-guard.guard';
import { LoginGuardGuard } from '@advanced-front/core/guards/login-guard.guard';
import { SidebarService } from './shared/sidebar.service';
import { SubirarhivoService } from './subirarchivo/subirarhivo.service';
import { UsuarioService } from './usuario/usuario.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [SidebarService, UsuarioService, LoginGuardGuard, SubirarhivoService, AdminGuardGuard],
})
export class ServiceModule {}
