import { NgModule } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuoteComponent } from './quote.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [QuoteComponent],
  exports: [QuoteComponent],
  providers: [UpperCasePipe]
})
export class QuoteModule { }
