import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Modulos
// import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { PipesModule } from '../core/pipes/pipes.module';
import { SharedModule } from '../layout/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { ProfileComponent } from './profile/profile.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [PagesComponent, DashboardComponent, ProfileComponent, TasksComponent, UsersComponent],
  exports: [PagesComponent, DashboardComponent, TasksComponent, UsersComponent],
  imports: [SharedModule, PAGES_ROUTES, FormsModule, CommonModule, PipesModule],
})
export class PagesModule {}
