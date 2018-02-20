import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { User } from '../../../shared';

describe('UsersService', () => {
  let injector: TestBed;
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    injector = getTestBed();
    service = injector.get(UsersService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUsers', () => {
    it('should return an Observable<Array<User>>', () => {
      const dummyUsers: Array<User> = [{
        name: 'John',
        password: 'xxx',
        isAdmin: false,
        email: 'john@doe.net',
        balance: 100,
        portfolio: []
      }];

      service.getUsers().subscribe(users => {
        expect(users.length).toBe(1);
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne(service.getAPIURL() + '/users');
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });
  });

});
