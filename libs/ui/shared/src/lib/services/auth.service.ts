import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV, Login, UserUI } from '@starter/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private env = inject(ENV);
  private http = inject(HttpClient);

  baseUrl = `${this.env.apiUrl}/auth`;

  login(data: Login) {
    return this.http.post<UserUI>(`${this.baseUrl}/login`, data);
  }

  register(data: Login) {
    return this.http.post<UserUI>(`${this.baseUrl}/register`, data);
  }
}
