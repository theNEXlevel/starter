import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserRepository } from '../../state/user.repository';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  user$ = this.userRepo.user$;

  open = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userRepo: UserRepository,
    private snackBar: MatSnackBar
  ) {}

  toggle(trigger: any) {
    this.triggerOrigin = trigger;
    this.open = !this.open;
  }

  logout(): void {
    this.userRepo.resetUser();
    this.snackBar.open('You have been logged out!', undefined, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'notif-success',
      duration: 3000,
    });
  }
}
