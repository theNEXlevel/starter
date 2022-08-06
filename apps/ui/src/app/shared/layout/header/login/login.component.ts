import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Login } from '@starter/api-interfaces';
import { AuthService } from '../../../services/auth.service';
import { ErrorRepository } from '../../../state/error.respository';

@Component({
  selector: 'starter-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  error$ = this.errorRepo.error$;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
  constructor(private fb: NonNullableFormBuilder, private authSvc: AuthService, private errorRepo: ErrorRepository) {}

  submit(): void {
    this.errorRepo.resetError();
    if (this.form.invalid) {
      return;
    }
    this.authSvc.login(this.form.value as Login).subscribe();
  }
}
