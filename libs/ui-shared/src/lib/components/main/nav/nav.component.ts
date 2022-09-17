import { ChangeDetectionStrategy, Component, Inject, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CdkOverlayOrigin, OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { logoutUser, selectUser, selectUserDarkMode, showMsg, toggleDarkMode } from '../../../state';

@Component({
  selector: 'sta-sh-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );
  triggerOrigin!: CdkOverlayOrigin;
  user$ = this.store.select(selectUser);
  open = false;
  darkMode$ = this.store.select(selectUserDarkMode).pipe(
    tap((darkMode) => {
      if (darkMode) {
        this.renderer.addClass(this.document.body, 'dark-mode');
        this.overlay.getContainerElement().classList.add('dark-mode');
      } else {
        this.renderer.removeClass(this.document.body, 'dark-mode');
        this.overlay.getContainerElement().classList.remove('dark-mode');
      }
    })
  );

  vm$ = combineLatest([this.isHandset$, this.darkMode$, this.user$]).pipe(
    map(([isHandset, darkMode, user]) => ({ isHandset, darkMode, user }))
  );

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    private overlay: OverlayContainer
  ) {}

  toggle(trigger: CdkOverlayOrigin): void {
    this.triggerOrigin = trigger;
    this.open = !this.open;
  }

  toggleTheme(): void {
    this.store.dispatch(toggleDarkMode());
  }

  logout(): void {
    this.store.dispatch(logoutUser());
    this.store.dispatch(showMsg({ msg: { message: 'You have been logged out!' } }));
  }
}
