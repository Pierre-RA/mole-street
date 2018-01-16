import { NgModule } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuoteComponent } from './quote.component';
import { NumberPipe } from './number.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [QuoteComponent, NumberPipe],
  exports: [QuoteComponent],
  providers: [UpperCasePipe]
})
export class QuoteModule { }
