import { RouterModule, Routes } from '@angular/router';

import { AdminGuardGuard } from '@advanced-front/core/guards/admin-guard.guard';
import { LoginGuardGuard } from '@advanced-front/core/guards/login-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

const pageRute: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
      { path: 'categoria', component: TasksComponent, data: { titulo: 'Tareas' } },
      // {path: 'users', component: ParticipanteComponent, data: {titulo: 'Usuarios'}},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: PagesComponent,
    canActivate: [AdminGuardGuard],
    children: [{ path: 'users', component: UsersComponent, data: { titulo: 'Usuarios' } }],
  },
];
export const PAGES_ROUTES = RouterModule.forChild(pageRute);
