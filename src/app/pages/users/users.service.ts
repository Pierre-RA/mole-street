import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../../shared';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  getAccessToken(email: string, password: string): Observable<string> {
    return this.http.post(
      this.api + '/users/accessToken',
      { email: email, password: password })
      .map(res => res['token']);
  }

}
