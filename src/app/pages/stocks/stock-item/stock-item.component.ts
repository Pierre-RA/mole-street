import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Stock } from '../../../../shared';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {

  stocks: Array<Stock>;
  loaded: boolean;
  message: string;
  @ViewChild('canvas') canvasRef: ElementRef;

  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params['id']) {
      this.stockService.getStock(this.activatedRoute.snapshot.params['id']).subscribe(data => {
        this.loaded = true;
        this.stocks = data;
        this.drawGraph();
        console.log(this.stocks);
      }, err => {
        this.loaded = true;
        this.message = 'Cannot fetch data.';
      });
    }
  }

  drawGraph() {
    console.log(
      'draw graph',
      this.canvasRef.nativeElement.scrollHeight,
      this.canvasRef.nativeElement.scrollWidth
    );
    const height = this.canvasRef.nativeElement.scrollHeight;
    const width = this.canvasRef.nativeElement.scrollWidth;
  }

}
