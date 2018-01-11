import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DailyQuote, QuarterlyQuote } from '../../../shared';

@Component({
  selector: 'app-template-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  @Input('quote') quote: DailyQuote;
  @Input('click') click: boolean;
  @Input('small') small: boolean;
  last: QuarterlyQuote;
  lastTime: Date;

  constructor(private router: Router) { }

  ngOnInit() {
    this.setLast();
  }

  getChange() {
    let change = 0;
    if (this.last.change !== 0) {
      change = (this.last.last / this.last.open - 1) * 100;
    }
    return change > 0 ? '+' + change.toFixed(2) + '%' : change.toFixed(2) + '%';
  }

  go() {
    if (this.click) {
      this.router.navigate(['quote', this.quote.symbol]);
    }
  }

   setLast(): void {
    let last: QuarterlyQuote;
    const time: Date = new Date(this.quote.date);
    for (let i = 8; i < 17; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.quote.hours[i] && this.quote.hours[i][j] && this.quote.hours[i][j].last) {
          last = this.quote.hours[i][j];
          time.setHours(i);
          time.setMinutes(j * 15);
        }
      }
    }
    this.last = last;
    this.lastTime = time;
  }

}
