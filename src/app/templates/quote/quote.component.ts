import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Asset, DailyQuote, SixthlyQuote } from '../../../shared';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../pages/users/users.service';

@Component({
  selector: 'app-template-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  @Input('quote') quote: DailyQuote;
  @Input('click') click: boolean;
  @Input('small') small: boolean;
  @Input('action') action: string;
  @Output() editted;
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
  buyForm: FormGroup;
  sellForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UsersService,
    private authService: AuthService
  ) {
    this.editted = new EventEmitter<boolean>();
  }

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
    this.initForms();
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

  initForms(): void {
    this.buyForm = this.fb.group({
      shares: [0, Validators.required]
    });
    this.sellForm = this.fb.group({
      shares: [0, Validators.required]
    });
  }

  onBuySubmit(): void {
    const asset: Asset = {
      symbol: this.quote.symbol,
      amount: +this.buyForm.value['shares'],
      price: 0,
      timestamp: new Date().toISOString()
    };
    this.userService.buy(
      this.authService.getOwnerId(),
      asset
    ).subscribe(doc => {
      this.editted.emit(true);
    });
  }

  onSellSubmit(): void {
    const asset: Asset = {
      symbol: this.quote.symbol,
      amount: +this.sellForm.value['shares'],
      price: 0,
      timestamp: new Date().toISOString()
    };
    this.userService.sell(
      this.authService.getOwnerId(),
      asset
    ).subscribe(doc => {
      this.editted.emit(true);
    });
  }

  onCancel(): void {
    this.editted.emit(true);
  }

}
