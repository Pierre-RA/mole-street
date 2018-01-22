import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SignUpComponent } from './sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SignUpComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [SignUpComponent]
})
export class SignUpModule { }
