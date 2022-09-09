import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Login, LoginForm } from '@starter/api-interfaces';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { selectUser, selectUserMsg, showMsg } from '../../state';
import * as UserActions from '../../state/user';

@Component({
  selector: 'starter-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  form = new FormGroup<LoginForm>({
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
  });
  user$ = this.store.select(selectUser).pipe(
    tap((user) => {
      if (user.id) {
        this.loadingSubject.next(false);
        this.store.dispatch(showMsg({ msg: { message: 'You have been logged in!' } }));
        this.router.navigate(['dashboard']);
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

  constructor(private router: Router, private store: Store) {}

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loadingSubject.next(true);
    const data = { user: this.form.value as Login };
    this.store.dispatch(UserActions.registerRequest(data));
  }
}
