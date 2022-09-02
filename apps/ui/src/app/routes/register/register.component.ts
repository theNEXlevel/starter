import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login, LoginForm } from '@starter/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'starter-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  loadingSubject!: BehaviorSubject<boolean>;
  loading$!: Observable<boolean>;
  form!: FormGroup;

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  constructor(private authSvc: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.loading$ = this.loadingSubject.asObservable();
    this.form = new FormGroup<LoginForm>({
      email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      password: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    });
  }

  submit(): void {
    this.email?.markAsDirty();
    this.password?.markAsDirty();
    if (this.form.invalid) {
      return;
    }
    this.loadingSubject.next(true);
    this.authSvc.register(this.form.value as Login).subscribe({
      next: () => {
        this.snackBar.open('Registered - You have been logged in!', undefined, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'notif-success',
          duration: 3000,
        });
        this.loadingSubject.next(false);
        this.router.navigate(['dashboard']);
      },
      error: () => {
        this.loadingSubject.next(false);
      },
    });
  }
}
