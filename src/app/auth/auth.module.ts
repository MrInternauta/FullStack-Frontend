import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [],
})
export class AuthModule {}
