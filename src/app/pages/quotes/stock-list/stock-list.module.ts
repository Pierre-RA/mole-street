import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuoteModule } from '../../../templates/quote/quote.module';
import { StockListComponent } from './stock-list.component';
import { QuoteService } from '../quote.service';

@NgModule({
  imports: [
    CommonModule,
    QuoteModule,
    RouterModule.forChild([
      { path: '', component: StockListComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [StockListComponent],
  providers: [QuoteService]
})
export class StockListModule { }
