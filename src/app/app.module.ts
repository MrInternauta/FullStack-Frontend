import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// rutas
import { APP_ROUTES } from './app.routes';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
// Modulos
import { PagesModule } from './pages/pages.module';
// Servicios
import { ServiceModule } from './services/service.module';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, APP_ROUTES, CoreModule, ReactiveFormsModule, FormsModule, PagesModule, ServiceModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
