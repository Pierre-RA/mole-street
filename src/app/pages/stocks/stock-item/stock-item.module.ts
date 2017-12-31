import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { StockModule } from '../../../templates/stock/stock.module';
import { StockItemComponent } from './stock-item.component';
import { StockService } from '../stock.service';

@NgModule({
  imports: [
    CommonModule,
    StockModule,
    NgxChartsModule,
    RouterModule.forChild([
      { path: '', component: StockItemComponent }
    ])
  ],
  declarations: [StockItemComponent],
  providers: [StockService, DatePipe]
})
export class StockItemModule { }
