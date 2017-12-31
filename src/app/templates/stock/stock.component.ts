import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Stock } from '../../../shared';

@Component({
  selector: 'app-template-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  @Input('stock') stock: Stock;
  @Input('isList') isList: boolean;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  getChange() {
    const change = (1 - this.stock.last / this.stock.prev ) * 100;
    return change > 0 ? '+' + change.toFixed(2) + '%' : change.toFixed(2) + '%';
  }

  go() {
    if (this.isList) {
      this.router.navigate(['stocks', this.stock.initials]);
    }
  }

}
