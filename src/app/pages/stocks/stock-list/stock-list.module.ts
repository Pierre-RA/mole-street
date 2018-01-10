import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StockModule } from '../../../templates/stock/stock.module';
import { StockListComponent } from './stock-list.component';
import { StockService } from '../stock.service';

@NgModule({
  imports: [
    CommonModule,
    StockModule,
    RouterModule.forChild([
      { path: '', component: StockListComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [StockListComponent],
  providers: [StockService]
})
export class StockListModule { }
