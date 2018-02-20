import { NgModule } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { QuoteComponent } from './quote.component';
import { NumberPipe } from './number.pipe';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../pages/users/users.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [QuoteComponent, NumberPipe],
  exports: [QuoteComponent],
  providers: [UpperCasePipe, AuthService, UsersService]
})
export class QuoteModule { }
