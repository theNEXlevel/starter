import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectMsg } from '../../../state';

import { MainComponent } from './main.component';

const mockMatSnackBar = {
  open: jest.fn(),
};
const initialState = { msg: {} };

describe('MainComponent', () => {
  let component: MainComponent;
  let store: MockStore;
  let fixture: ComponentFixture<MainComponent>;

  afterEach(() => {
    store.resetSelectors();
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [
        provideMockStore({
          initialState: initialState,
          selectors: [
            {
              selector: selectMsg,
              value: {},
            },
          ],
        }),
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call messageSvc.add when initialized', () => {
    expect(mockMatSnackBar.open).not.toHaveBeenCalled();
  });

  it('should call open on matSnackBar when there is an error', () => {
    const error = {
      error: '123',
      message: '456',
    };
    const mySelector = store.overrideSelector(selectMsg, error);
    mySelector.setResult(error);
    store.refreshState();
    expect(mockMatSnackBar.open).toHaveBeenCalledTimes(1);
  });

  it('should call add on messageService when there is an error array', () => {
    const error = {
      error: '123',
      message: ['456', '789'],
    };
    const mySelector = store.overrideSelector(selectMsg, error);
    mySelector.setResult(error);
    store.refreshState();
    expect(mockMatSnackBar.open).toHaveBeenCalledTimes(1);
  });

  describe('ngOnInit', () => {
    it('should call subscribe on error$', () => {
      component.error$.subscribe = jest.fn();
      component.ngOnInit();
      expect(component.error$.subscribe).toHaveBeenCalledTimes(1);
    });
  });
});
