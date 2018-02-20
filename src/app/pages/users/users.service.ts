import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Asset, User } from '../../../shared';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {

  private api: string = environment.api;

  constructor(private http: HttpClient) { }

  getAPIURL(): string {
    return this.api;
  }

  // TODO: add object for registration
  register(): Observable<User> {
    return this.http.post<User>(
      this.api + '/users',
      null
    );
  }

  update(user: User, id: string): Observable<User> {
    return this.http.put<User>(
      this.api + '/users/' + id,
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

  buy(id: string, asset: Asset): Observable<User> {
    console.log('buy');
    return this.http.put<User>(
      this.api + '/users/buy/' + id, asset, {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

  sell(id: string, asset: Asset): Observable<User> {
    return this.http.put<User>(
      this.api + '/users/sell/' + id, asset, {
      headers: new HttpHeaders().set('Authorization', 'JWT ' + window.localStorage.getItem('session-token'))
    });
  }

}
