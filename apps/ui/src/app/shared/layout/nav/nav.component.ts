import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { selectUser, logoutUser } from '../../../state';

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

  triggerOrigin: any;

  user$ = this.store.select(selectUser);

  open = false;

  constructor(private breakpointObserver: BreakpointObserver, private store: Store, private snackBar: MatSnackBar) {}

  toggle(trigger: any) {
    this.triggerOrigin = trigger;
    this.open = !this.open;
  }

  logout(): void {
    this.store.dispatch(logoutUser());
    this.snackBar.open('You have been logged out!', undefined, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'notif-success',
      duration: 3000,
    });
  }
}
