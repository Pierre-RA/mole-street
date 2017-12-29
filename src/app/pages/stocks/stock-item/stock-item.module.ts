import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StockModule } from '../../../templates/stock/stock.module';
import { StockItemComponent } from './stock-item.component';
import { StockService } from '../stock.service';

@NgModule({
  imports: [
    CommonModule,
    StockModule,
    RouterModule.forChild([
      { path: '', component: StockItemComponent }
    ])
  ],
  declarations: [StockItemComponent],
  providers: [StockService]
})
export class StockItemModule { }
