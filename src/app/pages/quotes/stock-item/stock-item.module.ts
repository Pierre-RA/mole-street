import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { QuoteModule } from '../../../templates/quote/quote.module';
import { StockItemComponent } from './stock-item.component';
import { QuoteService } from '../quote.service';

@NgModule({
  imports: [
    CommonModule,
    QuoteModule,
    NgxChartsModule,
    RouterModule.forChild([
      { path: '', component: StockItemComponent }
    ])
  ],
  declarations: [StockItemComponent],
  providers: [QuoteService, DatePipe]
})
export class StockItemModule { }
