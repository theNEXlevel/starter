import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavComponent } from './nav.component';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CdkOverlayOrigin, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { selectUser, selectUserDarkMode } from 'apps/ui/src/app/state';

const breakpointObserverMock = {
  observe: jest.fn().mockReturnValue(of({ matches: true })),
};

const mockOverlay = {
  addClass: jest.fn(),
  removeClass: jest.fn(),
};

const initialState = { user: {}, msg: {}, darkMode: false };

describe('NavComponent', () => {
  let component: NavComponent;
  let store: MockStore;
  let renderer: Renderer2;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        OverlayModule,
      ],
      providers: [
        provideMockStore({
          initialState: initialState,
          selectors: [
            {
              selector: selectUser,
              value: initialState.user,
            },
          ],
        }),
        { provider: OverlayContainer, useValue: mockOverlay },
        Renderer2,
        { provider: BreakpointObserver, useValue: breakpointObserverMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    store = TestBed.inject(MockStore);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.isHandset$.subscribe();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should call addClass on renderer if darkMode is enabled', () => {
    const rendererSpy = jest.spyOn(renderer, 'addClass');
    store.overrideSelector(selectUserDarkMode, true);
    store.refreshState();
    expect(rendererSpy).toHaveBeenCalledTimes(1);
  });

  describe('toggle', () => {
    it('should set triggerOrigin to param', () => {
      const data: CdkOverlayOrigin = {
        elementRef: {
          nativeElement: {},
        },
      };
      component.toggle(data);
      expect(component.triggerOrigin).toEqual(data);
    });
    it('should toggle the open state', () => {
      const data: CdkOverlayOrigin = {
        elementRef: {
          nativeElement: {},
        },
      };
      component.open = true;
      component.toggle(data);
      expect(component.open).toBeFalsy();
    });
  });

  describe('logout', () => {
    it('should call open on snackBar', () => {
      const spy = jest.spyOn(store, 'dispatch');
      component.logout();
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('toggleTheme', () => {
    it('should call dispatch on store', () => {
      const spy = jest.spyOn(store, 'dispatch');
      component.toggleTheme();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
