import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { NopagefoundComponent } from './layout/nopagefound/nopagefound.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent },
];
export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: false });
