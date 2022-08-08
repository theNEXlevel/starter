import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Error, Login, UserApp } from '@starter/api-interfaces';
import { catchError, tap, throwError } from 'rxjs';
import { UserRepository } from '../state/user.repository';
import { ErrorRepository } from '../state/error.respository';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private userRepo: UserRepository, private errorRepo: ErrorRepository) {}

  login(data: Login) {
    return this.http.post<UserApp>(`${this.baseUrl}/login`, data).pipe(
      tap(this.userRepo.setUser),
      catchError((err: HttpErrorResponse) => {
        const error: Error = err.error;
        this.errorRepo.setError(error);
        return throwError(() => err);
      })
    );
  }

  register(data: Login) {
    return this.http.post<UserApp>(`${this.baseUrl}/register`, data).pipe(
      tap(this.userRepo.setUser),
      catchError((err: HttpErrorResponse) => {
        const error: Error = err.error;
        this.errorRepo.setError(error);
        return throwError(() => err);
      })
    );
  }
}
