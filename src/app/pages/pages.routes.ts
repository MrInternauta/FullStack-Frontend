import { RouterModule, Routes } from '@angular/router';

import { AdminGuardGuard } from '@advanced-front/core/guards/admin-guard.guard';
import { LoginGuardGuard } from '@advanced-front/core/guards/login-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { TasksComponent } from './tasks/tasks.component';

const pageRute: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
      { path: 'tasks', component: TasksComponent, data: { titulo: 'Tareas' } },
      {
        path: '',
        canActivate: [AdminGuardGuard],
        children: [
          {
            path: 'users',
            loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
            data: { titulo: 'Usuarios' },
          },
        ],
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];
export const PAGES_ROUTES = RouterModule.forChild(pageRute);
