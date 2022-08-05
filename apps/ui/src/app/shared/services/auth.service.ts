import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, switchMap } from 'rxjs';

export interface Login {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/auth`;

  private loginSubject = new Subject<Login>();
  login$ = this.loginSubject.asObservable().pipe(
    switchMap((data) => {
      return this.http.post(`${this.baseUrl}/login`, data);
    })
  );

  constructor(private http: HttpClient) {}

  login(data: Login) {
    this.loginSubject.next(data);
  }
}
