import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// rutas
import { AppRoutesModule } from './app.routes';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
// Modulos
import { PagesModule } from './pages/pages.module';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './pages/users/state/users.effects';

// Servicios

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutesModule, CoreModule, PagesModule, AuthModule, EffectsModule.forRoot([UsersEffects])],
  bootstrap: [AppComponent],
})
export class AppModule {}
