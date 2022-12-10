import { AbstractControl } from '@angular/forms';
import { User } from './prisma';

export interface LoginForm {
  email: AbstractControl<string>;
  password: AbstractControl<string>;
}

export interface Error {
  error: string;
  message: string[] | string;
  statusCode: number;
}

export type UserUI = User;

export interface Environment {
  production: boolean;
  apiUrl: string;
}

// export const ENV: Environment = {
//   production: true,
//   apiUrl: 'http://localhost:3000/api',
// };
