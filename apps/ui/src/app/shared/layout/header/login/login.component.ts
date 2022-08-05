import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';
import { AuthService, Login } from '../../../services/auth.service';

@Component({
  selector: 'starter-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  errorSubject = new BehaviorSubject<string>('');
  error$ = this.errorSubject.asObservable();

  login$ = this.authSvc.login$.pipe(
    tap((data) => {
      console.log(data);
      // handle user has been authed! Implement Elf state management
    }),
    catchError((err) => {
      this.errorSubject.next(err.error.message);
      return EMPTY;
    })
  );

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
  constructor(private fb: NonNullableFormBuilder, private authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.login$.subscribe();
    this.form.valueChanges.subscribe(() => {
      this.errorSubject.next('');
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.authSvc.login(this.form.value as Login);
  }
}
