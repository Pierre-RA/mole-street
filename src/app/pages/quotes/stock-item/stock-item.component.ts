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
        this.parseStocks();
      }, err => {
        this.loaded = true;
        this.message = 'Cannot fetch data.';
      });
    }
  }

  parseStocks() {
    let tmp;
    tmp = [];
    const date = new Date(this.stocks[0].date);
    let day = '(' + (date.getMonth() + 1) +
      ' - ' + date.getDate() + ')';
    for (let i = 8; i < 17; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.stocks[0].hours[i] && this.stocks[0].hours[i][j] && this.stocks[0].hours[i][j].last) {
          day = tmp.length === 0 ? day : '';
          tmp.push({
            name: i + ':' + (j * 15),
            value: this.stocks[0].hours[i][j].last
          });
        }
      }
    }
    this.results = [{
      name: this.stocks[0].symbol || 'N/A',
      series: tmp
    }];
  }

  xAxisTickFormatting(value) {
    return this.datePipe.transform(value, 'short');
  }

}
