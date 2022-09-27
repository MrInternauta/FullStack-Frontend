import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PipesModule } from '../core/pipes/pipes.module';
import { HeaderComponent, NopagefoundComponent, SidebarComponent } from './components';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SidebarService } from './services';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, BreadcrumbsComponent, NopagefoundComponent],
  imports: [RouterModule, CommonModule, PipesModule],
  exports: [HeaderComponent, SidebarComponent, BreadcrumbsComponent, NopagefoundComponent],
  providers: [SidebarService],
})
export class SharedModule {}
