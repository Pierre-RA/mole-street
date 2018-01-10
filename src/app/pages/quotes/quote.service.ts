import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { DailyQuote } from '../../../shared';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuoteService {

  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  getAll(page?: number, span?: number): Observable<Array<DailyQuote>> {
    return this.http.get<Array<DailyQuote>>(this.api + '/quotes');
  }

  getQuote(symbol: string): Observable<Array<DailyQuote>> {
    return this.http.get<Array<DailyQuote>>(this.api + '/quotes/' + symbol);
  }

  getFromIndex(symbol: string): Observable<Array<DailyQuote>> {
    return this.http.get<Array<DailyQuote>>(this.api + '/quotes/by-indicator/' + symbol);
  }

}
