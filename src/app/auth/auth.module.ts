import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminGuardGuard, LoginGuardGuard } from '@advanced-front/core';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { AuthService } from './services';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [AuthService, LoginGuardGuard, AdminGuardGuard],
})
export class AuthModule {}
