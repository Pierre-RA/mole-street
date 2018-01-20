import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  // TODO: add object for registration
  register(): Observable<User> {
    return this.http.post<User>(
      this.api + '/users',
      null
    );
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(
      this.api + '/users',
      user, {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(
      this.api + '/users', {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(
      this.api + '/users/' + id, {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

}
