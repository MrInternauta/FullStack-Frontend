import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AdminGuardGuard, LoginGuardGuard } from './guards';
import { AuthInterceptor } from './interceptors';
import { AppStoreModule } from './state/store.module';

@NgModule({
  declarations: [],
  imports: [AppStoreModule, CommonModule],
  providers: [
    LoginGuardGuard,
    AdminGuardGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
