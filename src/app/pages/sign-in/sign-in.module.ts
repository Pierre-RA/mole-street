import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SignInComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [SignInComponent]
})
export class SignInModule { }
