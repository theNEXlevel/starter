import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, User } from '@starter/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${this.env.apiUrl}/auth`;

  constructor(@Inject('env') private env: any, private http: HttpClient) {}

  login(data: Login) {
    return this.http.post<User>(`${this.baseUrl}/login`, data);
  }

  register(data: Login) {
    return this.http.post<User>(`${this.baseUrl}/register`, data);
  }
}
