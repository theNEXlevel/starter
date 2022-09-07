import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginUI, UserUI } from '@starter/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(data: LoginUI) {
    return this.http.post<UserUI>(`${this.baseUrl}/login`, data);
  }

  register(data: LoginUI) {
    return this.http.post<UserUI>(`${this.baseUrl}/register`, data);
  }
}
