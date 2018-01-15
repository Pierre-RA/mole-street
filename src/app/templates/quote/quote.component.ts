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
  change: number;
  changePercent: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.setLast();
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
    this.change = +(last.last - last.prev).toFixed(2);
    const tmp = (last.last / this.quote.open - 1) * 100;
    this.changePercent = tmp > 0 ? '+' + tmp.toFixed(2) + '%' : tmp.toFixed(2) + '%';
  }

}
