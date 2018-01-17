import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DailyQuote, SixthlyQuote } from '../../../shared';

@Component({
  selector: 'app-template-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  @Input('quote') quote: DailyQuote;
  @Input('click') click: boolean;
  @Input('small') small: boolean;
  last: SixthlyQuote;
  lastTime: Date;
  changePrev: {
    value: number,
    percent: number
  };
  changeOpen: {
    value: number,
    percent: number
  };

  constructor(private router: Router) { }

  ngOnInit() {
    this.changeOpen = {
      value: 0,
      percent: 0
    };
    this.changePrev = {
      value: 0,
      percent: 0
    };
    this.setLast();
  }

  go() {
    if (this.click) {
      this.router.navigate(['quote', this.quote.symbol]);
    }
  }

   setLast(): void {
    let last: SixthlyQuote;
    const time: Date = new Date(this.quote.date);
    for (let i = 8; i < 17; i++) {
      for (let j = 0; j < 6; j++) {
        if (this.quote.hours[i] && this.quote.hours[i][j] && this.quote.hours[i][j].last) {
          last = this.quote.hours[i][j];
          time.setHours(i);
          time.setMinutes(j * 15);
        }
      }
    }
    if (last && last.last) {
      this.last = last;
    } else {
      this.last = {
        last: 0,
        volume: 0,
        prev: 0,
        trend: 0
      };
    }
    this.lastTime = time;
    this.changePrev = {
      value: +(this.last.last - this.last.prev).toFixed(2),
      percent: +(((this.last.last / this.last.prev) - 1) * 100).toFixed(2)
    };
    this.changeOpen = {
      value: +(this.last.last - this.quote.open).toFixed(2),
      percent: +(((this.last.last / this.quote.open) - 1) * 100).toFixed(2)
    };
  }

}
