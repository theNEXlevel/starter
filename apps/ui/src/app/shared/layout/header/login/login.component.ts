import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Login } from '@starter/api-interfaces';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'starter-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
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

  @Input() overlay!: OverlayPanel;

  constructor(private fb: NonNullableFormBuilder, private authSvc: AuthService, private messageSvc: MessageService) {}

  submit(): void {
    this.email?.markAsDirty();
    this.password?.markAsDirty();
    if (this.form.invalid) {
      return;
    }
    this.loadingSubject.next(true);
    this.authSvc.login(this.form.value as Login).subscribe({
      next: () => {
        this.loadingSubject.next(false);
        this.messageSvc.add({ severity: 'success', summary: 'Logged in', detail: 'You have been logged in!' });
      },
      error: () => {
        this.loadingSubject.next(false);
      },
    });
  }
}
