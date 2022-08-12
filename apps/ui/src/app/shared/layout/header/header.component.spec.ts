import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRepository } from '../../state/user.repository';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let userRepo: UserRepository;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [UserRepository],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    userRepo = TestBed.inject(UserRepository);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set user$ to userRepo.user$ observable', () => {
      component.ngOnInit();
      expect(typeof component.user$).toEqual(typeof userRepo.user$);
    });
    it('should set items array with 1 item', () => {
      component.ngOnInit();
      expect(component.items.length).toEqual(1);
      expect(component.items[0].label).toEqual('Dashboard');
    });
  });

  describe('logoff', () => {
    it('should call resetUser on userRepo', () => {
      userRepo.resetUser = jest.fn();
      component.logoff();
      expect(userRepo.resetUser).toHaveBeenCalledTimes(1);
    });

    it('should reset the user', () => {
      component.logoff();
      expect(userRepo.user).toEqual({});
    });
  });
});
