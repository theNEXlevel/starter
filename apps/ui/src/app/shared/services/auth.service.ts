import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Error, Login, UserApp } from '@starter/api-interfaces';
import { catchError, EMPTY, tap } from 'rxjs';
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
        return EMPTY;
      })
    );
  }
}
