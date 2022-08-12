import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login, LoginForm } from '@starter/api-interfaces';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
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

  @Input() overlay!: OverlayPanel;

  constructor(private authSvc: AuthService, private messageSvc: MessageService) {}

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
        this.overlay.hide();
        this.loadingSubject.next(false);
        this.messageSvc.add({ severity: 'success', summary: 'Logged in', detail: 'You have been logged in!' });
      },
      error: () => {
        this.loadingSubject.next(false);
      },
    });
  }
}
