import { Component, OnInit, Input } from '@angular/core';

import { Stock } from '../../../shared';

@Component({
  selector: 'app-template-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  @Input('stock') stock: Stock;
  @Input('isList') isList: boolean;

  constructor() { }

  ngOnInit() {
  }

}
