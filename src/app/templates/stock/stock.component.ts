import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DailyQuote, QuarterlyQuote } from '../../../shared';

@Component({
  selector: 'app-template-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  @Input('stock') stock: DailyQuote;
  @Input('isList') isList: boolean;
  @Input('small') small: boolean;
  last: QuarterlyQuote;
  lastTime: Date;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.setLast();
  }

  getChange() {
    let change = 0;
    if (this.last.change !== 0) {
      change = (this.last.last / this.last.prev - 1) * 100;
    }
    return change > 0 ? '+' + change.toFixed(2) + '%' : change.toFixed(2) + '%';
  }

  go() {
    if (this.isList) {
      this.router.navigate(['stocks', this.stock.symbol]);
    }
  }

   setLast(): void {
    let last: QuarterlyQuote;
    const time: Date = new Date(this.stock.date);
    for (let i = 8; i < 17; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.stock.hours[i][j]) {
          last = this.stock.hours[i][j];
          time.setHours(i);
          time.setMinutes(j * 15);
        }
      }
    }
    this.last = last;
    this.lastTime = time;
  }

}
