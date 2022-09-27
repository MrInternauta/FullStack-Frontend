import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



import { PipesModule } from '@advanced-front/core/pipes/pipes.module';
import { SharedModule } from '@advanced-front/layout/shared.module';
import { UsersComponent } from './users.component';

const userRouter: Routes = [
  {
    path: '',
    component: UsersComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [UsersComponent],
  exports: [UsersComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(userRouter),
    FormsModule,
    CommonModule,
    PipesModule,
    // StoreModule.forFeature(usersFeatureKey, usersReducer),
  ],
})
export class UsersModule {}
