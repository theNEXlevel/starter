import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Confirm, Login, UserUI } from '@starter/interfaces';
import { ENV } from '@starter/ui/tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private env = inject(ENV);
  private http = inject(HttpClient);

  baseUrl = `${this.env.apiUrl}/auth`;

  confirm(data: Confirm) {
    return this.http.post<UserUI>(`${this.baseUrl}/confirm`, data);
  }

  login(data: Login) {
    return this.http.post<UserUI>(`${this.baseUrl}/login`, data);
  }

  register(data: Login) {
    return this.http.post<boolean>(`${this.baseUrl}/register`, data);
  }
}
