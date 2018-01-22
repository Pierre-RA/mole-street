import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Credentials, User } from '../../shared';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private api: string = environment.api;
  private user: User;
  private sub: BehaviorSubject<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getUser(): Observable<User> {
    return this.sub.asObservable();
  }

  setUser(token: string): void {
    this.http.get<User>(this.api + '/users')
      .subscribe(user => {
        this.sub.next(user);
      });
  }

  isLogged(): Observable<boolean> {
    return this.sub.asObservable().map(user => {
      return !!user;
    });
  }

  signIn(credentials: Credentials): Observable<boolean> {
    return this.getAccessToken(credentials)
      .map(token => {
        if (token) {
          this.setAccessToken(token);
          this.setUser(token);
        }
        return !!token;
      });
  }

  signOut(): void {
    this.removeAccessToken();
    this.sub.next(null);
    this.router.navigate(['']);
  }

  getAccessToken(credentials: Credentials): Observable<string> {
    return this.http.post(
      this.api + '/users/accessToken',
      { email: credentials.email, password: credentials.password })
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
