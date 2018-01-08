import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Chart, ChartData, DailyQuote } from '../../../../shared';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {

  stocks: Array<DailyQuote>;
  results: Array<Chart>;
  loaded: boolean;
  message: string;

  colorScheme = {
    domain: ['#2288ee']
  };

  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['id']) {
      this.stockService.getStock(this.activatedRoute.snapshot.params['id']).subscribe(data => {
        this.loaded = true;
        this.stocks = data;
        // this.parseStocks();
      }, err => {
        this.loaded = true;
        this.message = 'Cannot fetch data.';
      });
    }
  }

  // parseStocks() {
  //   this.results = [{
  //     name: this.stocks[0].initials || 'N/A',
  //     series: this.stocks.slice().reverse().map(data => {
  //       return {
  //         name: new Date(data.time).getHours() + ':' + new Date(data.time).getMinutes(),
  //         value: data.last
  //       };
  //     })
  //   }];
  // }

  xAxisTickFormatting(value) {
    return this.datePipe.transform(value, 'short');
  }

}
