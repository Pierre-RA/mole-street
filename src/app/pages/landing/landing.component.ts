import { Component, OnInit } from '@angular/core';

import { DailyQuote } from '../../../shared';
import { QuoteService } from '../quotes/quote.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  msAll: DailyQuote;
  loaded: boolean;
  message: string;

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.getQuote('MS-ALL').subscribe(data => {
      this.loaded = true;
      this.msAll = data[0] ? data[0] : null;
    }, err => {
      this.loaded = true;
      this.message = 'Cannot fetch data.';
    });
  }

}
