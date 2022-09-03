import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login, LoginForm } from '@starter/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { showMsg } from '../../../../state';

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

  constructor(private authSvc: AuthService, private store: Store) {}

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
        this.store.dispatch(showMsg({ msg: { message: 'You have been logged in!' } }));
      },
      error: () => {
        this.loadingSubject.next(false);
      },
    });
  }
}
