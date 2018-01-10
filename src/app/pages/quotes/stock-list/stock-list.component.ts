import { Component, OnInit } from '@angular/core';

import { DailyQuote } from '../../../../shared';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  stocks: Array<DailyQuote>;
  loaded: boolean;
  message: string;

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getAll().subscribe(data => {
      this.loaded = true;
      this.stocks = data;
    }, err => {
      this.loaded = true;
      this.message = 'Cannot fetch data.';
    });
  }

}
