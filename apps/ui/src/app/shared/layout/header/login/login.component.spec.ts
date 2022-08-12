import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

import { LoginComponent } from './login.component';

jest.mock('../../../services/auth.service');

const mockMsgSvc = {
  add: jest.fn(),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: AuthService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [AuthService, { provide: MessageService, useValue: mockMsgSvc }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    authService.login = jest.fn().mockReturnValue(of({}));
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
    it('should call login of authSvc with form value', () => {
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.submit();
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith(component.form.value);
    });
    it('should call add on messageSvc with params on success', () => {
      authService.login = jest.fn().mockReturnValue(of({}));
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.submit();
      authService.login(component.form.value).subscribe(() => {
        expect(mockMsgSvc.add).toHaveBeenCalledTimes(1);
        expect(mockMsgSvc.add).toHaveBeenCalledWith({
          severity: 'success',
          summary: 'Registered',
          detail: 'You have been logged in!',
        });
      });
    });
    it('should call next on loadingSubject with false value on success', () => {
      authService.login = jest.fn().mockReturnValue(of({}));
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.loadingSubject.next = jest.fn();
      component.submit();
      authService.login(component.form.value).subscribe(() => {
        expect(component.loadingSubject.next).toHaveBeenCalledTimes(1);
        expect(component.loadingSubject.next).toHaveBeenCalledWith(false);
      });
    });
    it('should call hide on overlay on success', () => {
      authService.login = jest.fn().mockReturnValue(of({}));
      component.overlay = {
        hide: jest.fn(),
      } as unknown as OverlayPanel;
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.submit();
      authService.login(component.form.value).subscribe(() => {
        expect(component.overlay.hide).toHaveBeenCalledTimes(1);
      });
    });
    it('should call next on loadingSubject with false value on error', () => {
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.loadingSubject.next = jest.fn();
      authService.login = jest.fn().mockReturnValue(throwError(() => ''));
      component.submit();
      authService.login(component.form.value).subscribe({
        error: () => {
          expect(component.loadingSubject.next).toHaveBeenCalledTimes(2);
          expect(component.loadingSubject.next).toHaveBeenNthCalledWith(2, false);
        },
      });
    });
  });
});
