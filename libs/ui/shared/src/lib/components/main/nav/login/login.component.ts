import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login, LoginForm } from '@starter/interfaces';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { selectUser, selectUserMsg, showMsg } from '../../../../state';
import * as UserActions from '../../../../state/user';

@Component({
  selector: 'sta--login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private store = inject(Store);

  loading$ = new BehaviorSubject<boolean>(false);
  showRegister = false;
  form = new FormGroup<LoginForm>({
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
  });
  user$ = this.store.select(selectUser).pipe(
    tap((user) => {
      if (user.id) {
        this.closeOverlay.emit();
        this.loading$.next(false);
        this.store.dispatch(showMsg({ msg: { message: 'You have been logged in!' } }));
      } else if (user.verified === false) {
        this.closeOverlay.emit();
        this.loading$.next(false);
        this.store.dispatch(showMsg({ msg: { message: 'Check your email for a confirmation!' } }));
      }
    })
  );

  userError$ = this.store.select(selectUserMsg).pipe(
    tap((msg) => {
      if (msg.error) {
        this.loading$.next(false);
        this.store.dispatch(showMsg({ msg }));
      }
    })
  );
  vm$ = combineLatest([this.user$, this.userError$, this.loading$]).pipe(map(([, , loading]) => ({ loading })));

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  @Output() closeOverlay = new EventEmitter();

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading$.next(true);
    const data = { user: this.form.value as Login };
    this.store.dispatch(this.showRegister ? UserActions.registerRequest(data) : UserActions.loginRequest(data));
  }

  toggleRegister(): void {
    this.showRegister = !this.showRegister;
  }
}
