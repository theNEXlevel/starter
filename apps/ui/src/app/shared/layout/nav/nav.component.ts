import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectUser, logoutUser, showMsg } from '../../../state';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'starter-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  triggerOrigin!: CdkOverlayOrigin;

  user$ = this.store.select(selectUser);

  open = false;

  constructor(private breakpointObserver: BreakpointObserver, private store: Store) {}

  toggle(trigger: CdkOverlayOrigin) {
    this.triggerOrigin = trigger;
    this.open = !this.open;
  }

  logout(): void {
    this.store.dispatch(logoutUser());
    this.store.dispatch(showMsg({ msg: { message: 'You have been logged out!' } }));
  }
}
