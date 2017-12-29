import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Stock } from '../../../shared';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class StockService {

  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  getLast(): Observable<Array<Stock>> {
    if (environment.production) {
      return this.http.get<Array<Stock>>(this.api + '/stocks/last');
    }
    return Observable.of(JSON.parse(
      '[{"_id":"LF","name":"liquid fortune","initials":"LF","time":1514446380043,' +
      '"volume":798643,"high":104.69,"low":104.12,"open":104.3,"close":0,"last":104.61,"prev":104.54,"change":0.07},' +
      '{"_id":"AN","name":"awesome navigations","initials":"AN","time":1514446380043,' +
      '"volume":328730,"high":139.41,"low":138.98,"open":139.16,"close":0,"last":139.41,"prev":139.34,"change":0.07}]')
    );
  }

  getStock(initials: string): Observable<Array<Stock>> {
    if (environment.production) {
      return this.http.get<Array<Stock>>(this.api + '/stocks/' + initials);
    }
    return Observable.of(JSON.parse(
      '[{"_id":"5a44bbf078f158723f99cf6c","__v":0,"name":"liquid fortune","initials":"LF","time":1514454000663,' +
      '"volume":798643,"high":104.69,"low":104.12,"open":104.3,"close":0,"last":104.57,"prev":104.61,"change":-0.04},' +
      '{"_id":"5a449e2c82c6df6cd376b82f","__v":0,"name":"liquid fortune","initials":"LF","time":1514446380043,' +
      '"volume":798643,"high":104.69,"low":104.12,"open":104.3,"close":0,"last":104.61,"prev":104.54,"change":0.07},' +
      '{"_id":"5a449d78fa10f86bc00fddf3","__v":0,"name":"liquid fortune","initials":"LF","time":1514446200514,' +
      '"volume":798643,"high":104.69,"low":104.12,"open":104.3,"close":0,"last":104.54,"prev":104.63,"change":-0.09},' +
      '{"_id":"5a449d3cfa10f86bc00fddf1","__v":0,"name":"liquid fortune","initials":"LF","time":1514446140257,' +
      '"volume":798643,"high":104.69,"low":104.12,"open":104.3,"close":0,"last":104.63,"prev":104.62,"change":0.01},' +
      '{"_id":"5a449d00fa10f86bc00fddef","__v":0,"name":"liquid fortune","initials":"LF","time":1514446080098,' +
      '"volume":798643,"high":104.69,"low":104.12,"open":104.3,"close":0,"last":104.62,"prev":104.69,"change":-0.07},' +
      '{"_id":"5a449cc4fa10f86bc00fdded","__v":0,"name":"liquid fortune","initials":"LF","time":1514446020909,' +
      '"volume":798643,"high":104.69,"low":104.12,"open":104.3,"close":0,"last":104.69,"prev":104.64,"change":0.05},' +
      '{"_id":"5a449c88fa10f86bc00fddeb","__v":0,"name":"liquid fortune","initials":"LF","time":1514445960748,' +
      '"volume":798643,"high":104.64,"low":104.12,"open":104.3,"close":0,"last":104.64,"prev":104.56,"change":0.08},' +
      '{"_id":"5a449c4cfa10f86bc00fdde9","__v":0,"name":"liquid fortune","initials":"LF","time":1514445900595,' +
      '"volume":798643,"high":104.56,"low":104.12,"open":104.3,"close":0,"last":104.56,"prev":104.47,"change":0.09},' +
      '{"_id":"5a449c10fa10f86bc00fdde7","__v":0,"name":"liquid fortune","initials":"LF","time":1514445840449,' +
      '"volume":798643,"high":104.47,"low":104.12,"open":104.3,"close":0,"last":104.47,"prev":104.45,"change":0.02},' +
      '{"_id":"5a449bd4fa10f86bc00fdde5","__v":0,"name":"liquid fortune","initials":"LF","time":1514445780349,' +
      '"volume":798643,"high":104.45,"low":104.12,"open":104.3,"close":0,"last":104.45,"prev":104.36,"change":0.09},' +
      '{"_id":"5a449b98fa10f86bc00fdde3","__v":0,"name":"liquid fortune","initials":"LF","time":1514445720177,' +
      '"volume":798643,"high":104.36,"low":104.12,"open":104.3,"close":0,"last":104.36,"prev":104.27,"change":0.09},' +
      '{"_id":"5a449b5cfa10f86bc00fdde1","__v":0,"name":"liquid fortune","initials":"LF","time":1514445660060,' +
      '"volume":798643,"high":104.33,"low":104.12,"open":104.3,"close":0,"last":104.27,"prev":104.31,"change":-0.04},' +
      '{"_id":"5a449b20fa10f86bc00fdddf","__v":0,"name":"liquid fortune","initials":"LF","time":1514445600943,' +
      '"volume":798643,"high":104.33,"low":104.12,"open":104.3,"close":0,"last":104.31,"prev":104.22,"change":0.09},' +
      '{"_id":"5a449ae4fa10f86bc00fdddd","__v":0,"name":"liquid fortune","initials":"LF","time":1514445540809,' +
      '"volume":798643,"high":104.33,"low":104.12,"open":104.3,"close":0,"last":104.22,"prev":104.25,"change":-0.03},' +
      '{"_id":"5a449aa8fa10f86bc00fdddb","__v":0,"name":"liquid fortune","initials":"LF","time":1514445480705,' +
      '"volume":798643,"high":104.33,"low":104.12,"open":104.3,"close":0,"last":104.25,"prev":104.17,"change":0.08},' +
      '{"_id":"5a3f8e8c599b5e5cdc33ef85","__v":0,"name":"liquid fortune","initials":"LF","time":1514114700358,' +
      '"volume":798643,"high":104.33,"low":104.12,"open":104.3,"close":0,"last":104.17,"prev":104.12,"change":0.05},' +
      '{"_id":"5a3f8e509e1b055cab8f5306","__v":0,"name":"liquid fortune","initials":"LF","time":1514114640163,' +
      '"volume":798643,"high":104.33,"low":104.12,"open":104.3,"close":0,"last":104.12,"prev":104.2,"change":-0.08},' +
      '{"_id":"5a3f8e149e1b055cab8f5304","__v":0,"name":"liquid fortune","initials":"LF","time":1514114580002,' +
      '"volume":798643,"high":104.33,"low":104.2,"open":104.3,"close":0,"last":104.2,"prev":104.31,"change":-0.11},' +
      '{"_id":"5a3f8d602bf44c5c7dfa5894","__v":0,"name":"liquid fortune","initials":"LF","time":1514114400857,' +
      '"volume":798643,"high":104.33,"low":104.3,"open":104.3,"close":0,"last":104.31,"prev":104.33,"change":-0.02},' +
      '{"_id":"5a3f87fc90c21854c244e820","__v":0,"name":"liquid fortune","initials":"LF","time":1514113020766,' +
      '"volume":798643,"high":104.33,"low":104.3,"open":104.3,"close":0,"last":104.33,"prev":104.3,"change":0.03},' +
      '{"_id":"5a3f87ed90c21854c244e81f","__v":0,"name":"liquid fortune","initials":"LF","time":1514113005447,' +
      '"volume":798643,"open":104.3,"close":0,"high":104.3,"low":104.3,"last":104.3,"prev":0,"change":0}]'
    ));
  }

}
