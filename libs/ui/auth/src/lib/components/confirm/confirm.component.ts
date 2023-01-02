import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Confirm } from '@starter/interfaces';
import { AuthService } from '@starter/ui/shared';
import { BehaviorSubject, filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'sta-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private authSvc = inject(AuthService);

  message$ = new BehaviorSubject<string>('Confirming your account!');

  user$ = this.route.queryParamMap.pipe(
    map((params) => {
      return {
        email: params.get('email') as string,
        token: params.get('token') as string,
      } as Confirm;
    }),
    tap((confirm) => {
      if (!confirm.email || !confirm.token) {
        this.message$.next(`Looks like we're missing some information, please click the link in your email.`);
      }
    }),
    filter((confirm) => Boolean(!confirm.email || !confirm.token)),
    switchMap((confirm) => this.authSvc.confirm(confirm))
  );

  ngOnInit() {
    this.user$.subscribe();
  }
}
