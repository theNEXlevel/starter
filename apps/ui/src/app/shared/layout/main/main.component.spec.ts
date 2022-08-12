import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ErrorRepository } from '../../state/error.respository';

import { MainComponent } from './main.component';

const mockMsgSvc: Partial<MessageService> = {
  add: jest.fn(),
};

describe('MainComponent', () => {
  let component: MainComponent;
  let errorRepo: ErrorRepository;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [{ provide: MessageService, useValue: mockMsgSvc }, ErrorRepository],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    errorRepo = TestBed.inject(ErrorRepository);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call messageSvc.add when initialized', () => {
    expect(mockMsgSvc.add).not.toHaveBeenCalled();
  });

  it('should call add on messageService when there is an error', () => {
    const error = {
      error: '123',
      message: '456',
    };
    const svcMsg = {
      severity: 'error',
      summary: error.error,
      detail: error.message,
    };
    errorRepo.setError(error);
    expect(mockMsgSvc.add).toHaveBeenCalledTimes(3);
    expect(mockMsgSvc.add).toHaveBeenNthCalledWith(3, svcMsg);
  });

  it('should call add on messageService when there is an error array', () => {
    const error = {
      error: '123',
      message: ['456', '789'],
    };
    const svcMsg = {
      severity: 'error',
      summary: error.error,
      detail: error.message.join(', '),
    };
    errorRepo.setError(error);
    expect(mockMsgSvc.add).toHaveBeenCalledTimes(5);
    expect(mockMsgSvc.add).toHaveBeenNthCalledWith(5, svcMsg);
  });

  describe('ngOnInit', () => {
    it('should call subscribe on error$', () => {
      component.error$.subscribe = jest.fn();
      component.ngOnInit();
      expect(component.error$.subscribe).toHaveBeenCalledTimes(1);
    });
  });
});
