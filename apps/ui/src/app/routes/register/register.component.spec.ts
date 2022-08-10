import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EMPTY, throwError } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

import { RegisterComponent } from './register.component';

jest.mock('../../shared/services/auth.service');

const routerMock = {
  navigate: jest.fn(),
};

const mockMsgSvc = {
  add: jest.fn(),
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let authService: AuthService;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RegisterComponent],
      providers: [
        NonNullableFormBuilder,
        AuthService,
        { provide: Router, useValue: routerMock },
        { provide: MessageService, useValue: mockMsgSvc },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    authService.register = jest.fn().mockReturnValue(EMPTY);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set loadingSubject to a behaviorSubject and set it to false', () => {
      component.ngOnInit();
      expect(component.loadingSubject.value).toEqual(false);
    });
    it('should set loading$ to an observable', () => {
      component.ngOnInit();
      expect(typeof component.loading$).toEqual(typeof component.loadingSubject.asObservable());
    });
    it('should set form to a formGroup with 2 input fields defaulted to empty strings', () => {
      component.ngOnInit();
      expect(component.form.get('email')?.value).toEqual('');
      expect(component.form.get('password')?.value).toEqual('');
    });
  });

  describe('submit', () => {
    it('should not call markAsDirty if the fields do not exist', () => {
      component.form = new FormGroup({});
      expect(component.submit()).toEqual(undefined);
    });
    it('should call markAsDirty on the password and email form fields', () => {
      (component.email as AbstractControl).markAsDirty = jest.fn();
      (component.password as AbstractControl).markAsDirty = jest.fn();
      component.submit();
      expect(component.email?.markAsDirty).toHaveBeenCalledTimes(1);
      expect(component.password?.markAsDirty).toHaveBeenCalledTimes(1);
    });
    it('should call next on loadingSubject with true', () => {
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.loadingSubject.next = jest.fn();
      component.submit();
      expect(component.loadingSubject.next).toHaveBeenCalledTimes(1);
      expect(component.loadingSubject.next).toHaveBeenCalledWith(true);
    });
    it('should call register of authSvc with form value', () => {
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.submit();
      expect(authService.register).toHaveBeenCalledTimes(1);
      expect(authService.register).toHaveBeenCalledWith(component.form.value);
    });
    it('should call add on messageSvc with params on success', () => {
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.submit();
      fixture.detectChanges();
      authService.register(component.form.value).subscribe(() => {
        expect(mockMsgSvc.add).toHaveBeenCalledTimes(1);
        expect(mockMsgSvc.add).toHaveBeenCalledWith({
          severity: 'success',
          summary: 'Registered',
          detail: 'You have been logged in!',
        });
      });
    });
    it('should call next on loadingSubject with false value on success', () => {
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.loadingSubject.next = jest.fn();
      component.submit();
      authService.register(component.form.value).subscribe(() => {
        expect(component.loadingSubject.next).toHaveBeenCalledTimes(1);
        expect(component.loadingSubject.next).toHaveBeenCalledWith(false);
      });
    });
    it('should call navigate on router with dashboard on success', () => {
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.submit();
      authService.register(component.form.value).subscribe(() => {
        expect(routerMock.navigate).toHaveBeenCalledTimes(1);
        expect(routerMock.navigate).toHaveBeenCalledWith(['dashboard']);
      });
    });
    it('should call next on loadingSubject with false value on error', () => {
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.loadingSubject.next = jest.fn();
      authService.register = jest.fn().mockReturnValue(throwError(() => ''));
      component.submit();
      authService.register(component.form.value).subscribe({
        error: () => {
          expect(component.loadingSubject.next).toHaveBeenCalledTimes(2);
          expect(component.loadingSubject.next).toHaveBeenNthCalledWith(2, false);
        },
      });
    });
  });
});
