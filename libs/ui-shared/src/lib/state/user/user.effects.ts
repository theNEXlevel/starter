import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Error } from '@starter/interfaces';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginRequest),
      mergeMap((data) =>
        this.authService.login(data.user).pipe(
          map((user) => {
            return UserActions.loginSuccess({ user });
          }),
          catchError((err) => {
            const error: Error = err.error;
            return of(UserActions.loginError({ error }));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerRequest),
      mergeMap((data) =>
        this.authService.register(data.user).pipe(
          map((user) => {
            return UserActions.registerSuccess({ user });
          }),
          catchError((err) => {
            const error: Error = err.error;
            return of(UserActions.registerError({ error }));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
