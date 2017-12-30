import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Chart, ChartData, Stock } from '../../../../shared';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {

  stocks: Array<Stock>;
  results: Array<Chart>;
  loaded: boolean;
  message: string;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['id']) {
      this.stockService.getStock(this.activatedRoute.snapshot.params['id']).subscribe(data => {
        this.loaded = true;
        this.stocks = data;
        this.parseStocks();
      }, err => {
        this.loaded = true;
        this.message = 'Cannot fetch data.';
      });
    }
  }

  parseStocks() {
    this.results = [{
      name: 'test',
      series: this.stocks.reverse().map(data => {
        return {
          name: new Date(data.time).getHours() + ':' + new Date(data.time).getMinutes(),
          value: data.last
        };
      })
    }];
  }

}
