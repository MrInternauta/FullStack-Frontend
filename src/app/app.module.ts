import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// rutas
import { APP_ROUTES } from './app.routes';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
// Modulos
import { PagesModule } from './pages/pages.module';

// Servicios

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, APP_ROUTES, CoreModule, PagesModule, AuthModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
