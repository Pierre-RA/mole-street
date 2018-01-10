import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LandingComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [LandingComponent]
})
export class LandingModule { }
