import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
jest.mock('./auth.service');

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: AuthService;
  const mockDto = {
    email: 'test@test.com',
    password: '123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    mockAuthService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call register on authService', () => {
      controller.register(mockDto);
      expect(mockAuthService.register).toHaveBeenCalledTimes(1);
      expect(mockAuthService.register).toHaveBeenCalledWith(mockDto);
    });
  });

  describe('login', () => {
    it('should call login on authService', () => {
      controller.login(mockDto);
      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
      expect(mockAuthService.login).toHaveBeenCalledWith(mockDto);
    });
  });
});
