import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '@starter/api-interfaces';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'starter-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

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
  constructor(private fb: NonNullableFormBuilder, private authSvc: AuthService, private router: Router) {}

  submit(): void {
    this.email?.markAsDirty();
    this.password?.markAsDirty();
    if (this.form.invalid) {
      return;
    }
    this.loadingSubject.next(true);
    this.authSvc.register(this.form.value as Login).subscribe({
      next: () => {
        this.loadingSubject.next(false);
        this.router.navigate(['dashboard']);
      },
      error: () => {
        this.loadingSubject.next(false);
      },
    });
  }
}
