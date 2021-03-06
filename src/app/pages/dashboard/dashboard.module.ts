import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { UsersService } from '../users/users.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [DashboardComponent],
  providers: [UsersService]
})
export class DashboardModule { }
