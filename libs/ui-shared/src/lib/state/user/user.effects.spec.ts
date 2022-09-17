import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { UserEffects } from './user.effects';
import * as UserActions from './user.actions';
import { Error, User } from '@starter/api-interfaces';

const initialState = {
  user: {},
  msg: {},
  darkMode: false,
};

const mockAuthService = {
  login: jest.fn().mockReturnValue(of(initialState)),
  register: jest.fn().mockReturnValue(of(initialState)),
};

describe('UserEffects', () => {
  let actions$: Observable<unknown>;
  let effects: UserEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
    effects = TestBed.inject(UserEffects);
  });

  describe('login$', () => {
    it('should call login on authService and return loginSuccess', () => {
      actions$ = of(UserActions.loginRequest);
      effects.login$.subscribe((action) => {
        expect(mockAuthService.login).toHaveBeenCalledTimes(1);
        expect(action).toEqual(UserActions.loginSuccess({ user: action as unknown as User }));
      });
    });

    it('should return loginError', () => {
      actions$ = of(UserActions.loginRequest);
      mockAuthService.login.mockReturnValue(
        throwError(() => ({
          error: '123',
        }))
      );
      effects.login$.subscribe((action) => {
        expect(mockAuthService.login).toHaveBeenCalledTimes(1);
        expect(action).toEqual(UserActions.loginError({ error: action as unknown as Error }));
      });
    });
  });

  describe('register$', () => {
    it('should call register on authService and return registerSuccess', () => {
      actions$ = of(UserActions.registerRequest);
      effects.register$.subscribe((action) => {
        expect(mockAuthService.register).toHaveBeenCalledTimes(1);
        expect(action).toEqual(UserActions.registerSuccess({ user: action as unknown as User }));
      });
    });

    it('should return registerError', () => {
      actions$ = of(UserActions.registerRequest);
      mockAuthService.register.mockReturnValue(
        throwError(() => ({
          error: '123',
        }))
      );
      effects.register$.subscribe((action) => {
        expect(mockAuthService.register).toHaveBeenCalledTimes(1);
        expect(action).toEqual(UserActions.registerError({ error: action as unknown as Error }));
      });
    });
  });
});
