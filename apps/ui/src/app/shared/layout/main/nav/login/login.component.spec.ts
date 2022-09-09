import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectUser, selectUserMsg } from '../../../../../state';

import { LoginComponent } from './login.component';

jest.mock('../../../services/auth.service');

const initialState = {
  user: {},
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let store: MockStore;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        provideMockStore({
          initialState: initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set loadingSubject to a behaviorSubject and set it to false', () => {
    expect(component.loadingSubject.value).toEqual(false);
  });
  it('should set loading$ to an observable', () => {
    expect(typeof component.loading$).toEqual(typeof component.loadingSubject.asObservable());
  });
  it('should set form to a formGroup with 2 input fields defaulted to empty strings', () => {
    expect(component.form.get('email')?.value).toEqual('');
    expect(component.form.get('password')?.value).toEqual('');
  });

  describe('mock user in state', () => {
    let storeSpy = {};
    beforeEach(() => {
      store.overrideSelector(selectUser, { id: '123' });
      storeSpy = jest.spyOn(store, 'dispatch');
      store.refreshState();
      component.user$.subscribe();
    });
    it('should set loading subject to false', () => {
      expect(component.loadingSubject.value).toEqual(false);
    });
    it('should call dispatch on store', () => {
      expect(storeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('mock userError in state', () => {
    let storeSpy = {};
    beforeEach(() => {
      store.overrideSelector(selectUserMsg, { error: '123' });
      storeSpy = jest.spyOn(store, 'dispatch');
      store.refreshState();
      component.userError$.subscribe();
    });
    it('should set loading subject to false', () => {
      expect(component.loadingSubject.value).toEqual(false);
    });
    it('should call dispatch on store', () => {
      expect(storeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('submit', () => {
    it('should return if the form is invalid', () => {
      expect(component.submit()).toEqual(undefined);
    });

    it('should set loadingSubject value to true', () => {
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      component.submit();
      expect(component.loadingSubject.value).toEqual(true);
    });

    it('should call dispatch on store', () => {
      const storeSpy = jest.spyOn(store, 'dispatch');
      component.email?.setValue('test@test.com');
      component.password?.setValue('123');
      const data = {
        type: '[User] Login Request',
        user: component.form.value,
      };
      component.submit();
      expect(storeSpy).toHaveBeenCalledTimes(1);
      expect(storeSpy).toHaveBeenCalledWith(data);
    });
  });
});
