import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavComponent } from './nav.component';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';

const mockMatSnackBar = {
  open: jest.fn(),
};
const breakpointObserverMock = {
  observe: jest.fn().mockReturnValue(of()),
};
const initialState = { user: {} };

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
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
        }),
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        { provider: BreakpointObserver, useValue: breakpointObserverMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  describe('toggle', () => {
    it('should set triggerOrigin to param', () => {
      const data = '123';
      component.toggle(data);
      expect(component.triggerOrigin).toEqual(data);
    });
    it('should toggle the open state', () => {
      component.open = true;
      component.toggle('123');
      expect(component.open).toBeFalsy();
    });
  });

  describe('logout', () => {
    it('should call open on snackBar', () => {
      component.logout();
      expect(mockMatSnackBar.open).toHaveBeenCalledTimes(1);
    });
  });
});
