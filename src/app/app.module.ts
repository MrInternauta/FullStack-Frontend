import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@advanced-front/environment';
import { AppComponent } from './app.component';
// rutas
import { APP_ROUTES } from './app.routes';
import { appReducers } from './core/state/app.reducer';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
// Modulos
import { PagesModule } from './pages/pages.module';
// Servicios
import { ServiceModule } from './services/service.module';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    APP_ROUTES,
    ReactiveFormsModule,
    FormsModule,
    PagesModule,
    ServiceModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
