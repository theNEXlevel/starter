import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Login, LoginForm } from '@starter/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'starter-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loadingSubject!: BehaviorSubject<boolean>;
  loading$!: Observable<boolean>;
  form!: FormGroup;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  @Output() closeOverlay = new EventEmitter();

  constructor(private authSvc: AuthService, private snackBar: MatSnackBar) {}

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
    this.authSvc.login(this.form.value as Login).subscribe({
      next: () => {
        this.closeOverlay.emit();
        this.loadingSubject.next(false);
        this.snackBar.open('You have been logged in!', undefined, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'notif-success',
          duration: 3000,
        });
      },
      error: () => {
        this.loadingSubject.next(false);
      },
    });
  }
}
