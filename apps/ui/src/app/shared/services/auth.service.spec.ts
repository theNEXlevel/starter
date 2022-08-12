import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { UserRepository } from '../state/user.repository';
import { ErrorRepository } from '../state/error.respository';
import { Login } from '@starter/api-interfaces';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let userRepo: UserRepository;
  let errorRepo: ErrorRepository;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRepository, ErrorRepository],
    });
    service = TestBed.inject(AuthService);
    userRepo = TestBed.inject(UserRepository);
    errorRepo = TestBed.inject(ErrorRepository);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call the correct endpoint with data and call setUser on UserRepository', () => {
      const data: Login = {
        email: 'test@test.com',
        password: '123',
      };
      userRepo.setUser = jest.fn();
      service.login(data).subscribe((response) => {
        expect(response).toBeDefined();
      });
      const req = httpTestingController.expectOne(`${service.baseUrl}/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(data);
      expect(userRepo.setUser).toHaveBeenCalledTimes(1);
    });
    it('should set the user', () => {
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
      expect(userRepo.user).toBeDefined();
    });
    it('should error and call setError on errorRepo', () => {
      const data: Login = {
        email: 'test@test.com',
        password: '123',
      };
      errorRepo.setError = jest.fn();
      const error = { message: 'Fake Error' };
      service.login(data).subscribe((response) => {
        expect(response).toBeDefined();
      });
      const req = httpTestingController.expectOne(`${service.baseUrl}/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(error, { status: 404, statusText: 'Not Found' });
      expect(errorRepo.setError).toHaveBeenCalledTimes(1);
      expect(errorRepo.setError).toHaveBeenCalledWith(error);
    });
  });

  describe('register', () => {
    it('should call the correct endpoint with data and call setUser on UserRepository', () => {
      const data: Login = {
        email: 'test@test.com',
        password: '123',
      };
      userRepo.setUser = jest.fn();
      service.register(data).subscribe((response) => {
        expect(response).toBeDefined();
      });
      const req = httpTestingController.expectOne(`${service.baseUrl}/register`);
      expect(req.request.method).toEqual('POST');
      req.flush(data);
      expect(userRepo.setUser).toHaveBeenCalledTimes(1);
    });
    it('should error and call setError on errorRepo', () => {
      const data: Login = {
        email: 'test@test.com',
        password: '123',
      };
      errorRepo.setError = jest.fn();
      const error = { message: 'Fake Error' };
      service.register(data).subscribe((response) => {
        expect(response).toBeDefined();
      });
      const req = httpTestingController.expectOne(`${service.baseUrl}/register`);
      expect(req.request.method).toEqual('POST');
      req.flush(error, { status: 404, statusText: 'Not Found' });
      expect(errorRepo.setError).toHaveBeenCalledTimes(1);
      expect(errorRepo.setError).toHaveBeenCalledWith(error);
    });
  });
});
