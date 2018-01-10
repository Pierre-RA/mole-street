import { NgModule } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StockComponent } from './stock.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [StockComponent],
  exports: [StockComponent],
  providers: [UpperCasePipe]
})
export class StockModule { }
