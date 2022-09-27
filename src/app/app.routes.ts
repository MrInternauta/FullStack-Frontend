import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { NopagefoundComponent } from './layout/components';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent },
];
export const AppRoutesModule = RouterModule.forRoot(appRoutes, { useHash: false });
