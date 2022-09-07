import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginUI, LoginForm } from '@starter/api-interfaces';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { selectUser, selectUserMsg, showMsg } from '../../../../../state';
import * as UserActions from '../../../../../state/user';

@Component({
  selector: 'starter-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  form = new FormGroup<LoginForm>({
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
  });
  user$ = this.store.select(selectUser).pipe(
    tap((user) => {
      if (user.id) {
        this.closeOverlay.emit();
        this.loadingSubject.next(false);
        this.store.dispatch(showMsg({ msg: { message: 'You have been logged in!' } }));
      }
    })
  );
  userError$ = this.store.select(selectUserMsg).pipe(
    tap((msg) => {
      if (msg.error) {
        this.loadingSubject.next(false);
        this.store.dispatch(showMsg({ msg }));
      }
    })
  );

  vm$ = combineLatest([this.user$, this.userError$]);

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  @Output() closeOverlay = new EventEmitter();

  constructor(private store: Store) {}

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loadingSubject.next(true);
    const data = { user: this.form.value as LoginUI };
    this.store.dispatch(UserActions.loginRequest(data));
  }
}
