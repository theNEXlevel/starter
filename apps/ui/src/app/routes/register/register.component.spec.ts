import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../shared/services/auth.service';

import { RegisterComponent } from './register.component';

jest.mock('../../shared/services/auth.service');

const routerMock = {
  navigate: jest.fn(),
};

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

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RegisterComponent],
      providers: [
        { provide: NonNullableFormBuilder, useValue: fbMock },
        AuthService,
        { provide: Router, useValue: routerMock },
        { provide: MessageService, useValue: mockMsgSvc },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
