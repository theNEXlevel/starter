import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Login, User } from '@starter/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(data: Login) {
    return this.http.post<User>(`${this.baseUrl}/login`, data);
  }

  register(data: Login) {
    return this.http.post<User>(`${this.baseUrl}/register`, data);
  }
}
