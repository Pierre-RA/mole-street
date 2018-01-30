import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Chart, ChartData, DailyQuote } from '../../../../shared';
import { QuoteService } from '../quote.service';

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
    private quoteService: QuoteService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['id']) {
      this.quoteService.getQuote(this.activatedRoute.snapshot.params['id']).subscribe(data => {
        this.loaded = true;
        this.stocks = data;
        this.parseStocks(1);
      }, err => {
        this.loaded = true;
        this.message = 'Cannot fetch data.';
      });
    }
  }

  parseStocks(length: number) {
    let tmp = [];
    this.stocks.slice(0, length).reverse().forEach(quote => {
      tmp = tmp.concat(this.parseQuote(quote));
    });
    this.results = [{
      name: this.stocks[0].symbol || 'N/A',
      series: tmp
    }];
  }

  parseQuote(quote: DailyQuote) {
    const tmp = [];
    const date = new Date(quote.date).getTime();
    for (let i = 8; i < 17; i++) {
      for (let j = 0; j < 4; j++) {
        if (quote.hours[i] && quote.hours[i][j] && quote.hours[i][j].last) {
          tmp.push({
            name: new Date(date + (j * 60 * 10 * 1000) + (i * 3600 * 1000)).toISOString(),
            value: quote.hours[i][j].last
          });
        }
      }
    }
    return tmp;
  }

  xAxisTickFormatting(value) {
    return new Date(value).toISOString();
  }

}
