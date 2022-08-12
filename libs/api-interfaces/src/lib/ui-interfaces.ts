import { AbstractControl } from '@angular/forms';

export interface LoginForm {
  email: AbstractControl<string>;
  password: AbstractControl<string>;
}
