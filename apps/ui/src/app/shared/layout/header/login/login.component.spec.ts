import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NonNullableFormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';

import { LoginComponent } from './login.component';

jest.mock('../../../services/auth.service');

const fbMock = {
  group: jest.fn().mockReturnValue({
    invalid: false,
    get: jest.fn().mockReturnValue('123'),
    email: '123',
    password: '123',
  }),
};

const mockMsgSvc = {
  add: jest.fn(),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: NonNullableFormBuilder, useValue: fbMock },
        AuthService,
        { provide: MessageService, useValue: mockMsgSvc },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
