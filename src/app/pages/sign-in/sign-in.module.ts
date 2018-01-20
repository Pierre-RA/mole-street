import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './sign-in.component';
import { UsersService } from '../users/users.service';
import { AuthService } from '../../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: SignInComponent, pathMatch: 'full' }
    ])
  ],
  declarations: [SignInComponent],
  providers: [UsersService, AuthService]
})
export class SignInModule { }
