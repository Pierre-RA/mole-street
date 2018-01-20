import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../../shared';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  getAccessToken(email: string, password: string): Observable<string> {
    return this.http.post(
      this.api + '/users/accessToken',
      { email: email, password: password })
      .map(res => res['token']);
  }

  // TODO: add object for refresh token
  refreshAccessToken(): Observable<string> {
    return this.http.post(
      this.api + '/users/refreshAccessToken',
      null
    )
    .map(res => res['token']);
  }

  setAccessToken(token: string): void {
    window.localStorage.setItem('session-token', token);
  }

  removeAccessToken(): void {
    window.localStorage.clear();
  }

}
