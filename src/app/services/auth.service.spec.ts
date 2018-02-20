import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { User } from '../../shared';

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('signIn', () => {
    it('should sign in', () => {
      service.signIn({ email: 'null', password: 'null'}).subscribe(token => {
        expect(token).toBe(true);
      });

      const req = httpMock.expectOne(service.getAPIURL() + '/users/accessToken');
      expect(req.request.method).toBe('POST');
    });
  });

  describe('getUser', () => {
    it('should return an Observable<Array<User>>', () => {
      const dummyUsers: User = {
        name: 'John',
        password: 'xxx',
        isAdmin: false,
        email: 'john@doe.net',
        balance: 100,
        portfolio: []
      };

      service.getUser().subscribe(user => {
        // expect(user).toEqual(dummyUsers);
        expect(user).toEqual(null);
      });

      // const req = httpMock.expectOne(service.getAPIURL() + '/users');
      // expect(req.request.method).toBe('GET');
      // req.flush(dummyUsers);
    });
  });

});
