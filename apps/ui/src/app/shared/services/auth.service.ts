import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ErrorEntity, Login, UserEntity } from '@starter/api-interfaces';
import { catchError, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { loginUser } from '../../state/user/user.actions';
import { showMsg } from '../../state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private store: Store) {}

  login(data: Login) {
    return this.http.post<UserEntity>(`${this.baseUrl}/login`, data).pipe(
      tap((user) => this.store.dispatch(loginUser({ user }))),
      catchError((err: HttpErrorResponse) => {
        const msg: ErrorEntity = err.error;
        this.store.dispatch(showMsg({ msg }));
        return throwError(() => err);
      })
    );
  }

  register(data: Login) {
    return this.http.post<UserEntity>(`${this.baseUrl}/register`, data).pipe(
      tap((user) => this.store.dispatch(loginUser({ user }))),
      catchError((err: HttpErrorResponse) => {
        const msg: ErrorEntity = err.error;
        this.store.dispatch(showMsg({ msg }));
        return throwError(() => err);
      })
    );
  }
}
