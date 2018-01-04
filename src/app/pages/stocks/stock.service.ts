import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Stock } from '../../../shared';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class StockService {

  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  getLast(): Observable<Array<Stock>> {
    return this.http.get<Array<Stock>>(this.api + '/stocks/last');
  }

  getStock(initials: string): Observable<Array<Stock>> {
    return this.http.get<Array<Stock>>(this.api + '/stocks/' + initials);
  }

}
