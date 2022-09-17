import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AuthService } from './auth.service';
import { Login } from '@starter/api-interfaces';
import { selectMsg, selectUser } from '../state';

const envMock = {
  production: true,
  apiUrl: 'http://localhost:3000/api',
};

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let store: MockStore;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({}), { provide: 'env', useValue: envMock }],
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call the correct endpoint with data', () => {
      const data: Login = {
        email: 'test@test.com',
        password: '123',
      };
      service.login(data).subscribe((response) => {
        expect(response).toBeDefined();
      });
      const req = httpTestingController.expectOne(`${service.baseUrl}/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(data);
    });
    it('should set the user and set the user in the store', () => {
      const data: Login = {
        email: 'test@test.com',
        password: '123',
      };
      service.login(data).subscribe((response) => {
        expect(response).toBeDefined();
      });
      const req = httpTestingController.expectOne(`${service.baseUrl}/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(data);
      expect(store.select(selectUser)).toBeDefined();
    });
    it('should error and show error message', () => {
      const data: Login = {
        email: 'test@test.com',
        password: '123',
      };
      const error = { message: 'Fake Error' };
      service.login(data).subscribe((response) => {
        expect(response).toBeDefined();
      });
      const req = httpTestingController.expectOne(`${service.baseUrl}/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(error, { status: 404, statusText: 'Not Found' });
      expect(store.select(selectMsg)).toBeDefined();
    });
  });

  describe('register', () => {
    it('should call the correct endpoint with data and set the user in the store', () => {
      const data: Login = {
        email: 'test@test.com',
        password: '123',
      };
      service.register(data).subscribe((response) => {
        expect(response).toBeDefined();
      });
      const req = httpTestingController.expectOne(`${service.baseUrl}/register`);
      expect(req.request.method).toEqual('POST');
      req.flush(data);
      expect(store.select(selectUser)).toBeDefined();
    });
    it('should error and show error message', () => {
      const data: Login = {
        email: 'test@test.com',
        password: '123',
      };
      const error = { message: 'Fake Error' };
      service.register(data).subscribe((response) => {
        expect(response).toBeDefined();
      });
      const req = httpTestingController.expectOne(`${service.baseUrl}/register`);
      expect(req.request.method).toEqual('POST');
      req.flush(error, { status: 404, statusText: 'Not Found' });
      expect(store.select(selectMsg)).toBeDefined();
    });
  });
});
