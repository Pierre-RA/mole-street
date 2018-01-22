import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [DashboardComponent],
  providers: [AuthService]
})
export class DashboardModule { }
