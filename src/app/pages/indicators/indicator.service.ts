import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { DailyIndicator, DailyQuote } from '../../../shared';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class IndicatorService {

  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  getIndicators(): Observable<Array<DailyIndicator>> {
    return this.http.get<Array<DailyIndicator>>(this.api + '/indicators');
  }

  getStocksFromIndicator(symbol: string): Observable<Array<DailyQuote>> {
    return this.http.get<Array<DailyQuote>>(this.api + '/stocks/by-indicator/' + symbol);
  }

}
