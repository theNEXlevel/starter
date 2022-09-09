import { AbstractControl } from '@angular/forms';

export interface LoginForm {
  email: AbstractControl<string>;
  password: AbstractControl<string>;
}

export interface Error {
  error: string;
  message: string[] | string;
  statusCode: number;
}
