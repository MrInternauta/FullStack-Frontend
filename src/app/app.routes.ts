import { RouterModule, Routes } from '@angular/router';

import { NopagefoundComponent } from './layout/nopagefound/nopagefound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent },
];
export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: false });
