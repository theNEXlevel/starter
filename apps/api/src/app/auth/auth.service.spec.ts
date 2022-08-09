import { ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UserEntity } from '@starter/api-interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
jest.mock('../prisma/prisma.service');
jest.mock('@nestjs/jwt');
jest.mock('@nestjs/config');

const argonMock = {
  hash: jest.fn().mockReturnValue('123'),
  verify: jest.fn().mockReturnValue(true),
};

const jwtMock = {
  signAsync: jest.fn().mockReturnValue('123'),
};

const configMock = {
  get: jest.fn().mockReturnValue('123'),
};

const mockDto: AuthDto = {
  email: 'test@test.com',
  password: '123',
};

const mockUser: UserEntity = {
  id: '123',
  email: 'test@test.com',
  hash: '123',
  name: 'Test',
  createdAt: new Date(),
  updatedAt: new Date(),
  accessToken: '123',
};

const prismaMock = {
  user: {
    create: jest.fn().mockReturnValue(mockUser),
    findUnique: jest.fn().mockReturnValue(mockUser),
  },
};

describe('AuthService', () => {
  let service: AuthService;
  let prismaSvc: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
        { provide: ConfigService, useValue: configMock },
        { provide: 'argon', useValue: argonMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaSvc = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should call hash on argon with the password', async () => {
      await service.register(mockDto);
      expect(argonMock.hash).toHaveBeenCalledTimes(1);
      expect(argonMock.hash).toHaveBeenCalledWith(mockDto.password);
    });
    it('should call user.create on prismaSvc with data', async () => {
      await service.register(mockDto);
      const createParams = {
        data: {
          email: 'test@test.com',
          hash: '123',
        },
      };
      expect(prismaSvc.user.create).toHaveBeenCalledTimes(1);
      expect(prismaSvc.user.create).toHaveBeenCalledWith(createParams);
    });
    it('should call signToken method with the user data', async () => {
      service.signToken = jest.fn().mockReturnValueOnce(mockUser);
      const returnVal = await service.register(mockDto);
      expect(service.signToken).toHaveBeenCalledTimes(1);
      expect(service.signToken).toHaveBeenCalledWith(mockUser);
      expect(returnVal).toEqual(mockUser);
    });
    it('should error and throw default error', async () => {
      const error = new Error('error!');
      const throwErrorMock = jest.fn().mockRejectedValueOnce(error);
      prismaSvc.user.create = throwErrorMock;
      await expect(service.register(mockDto)).rejects.toEqual(error);
    });
    it('should error and throw credentials taken', async () => {
      const error = new PrismaClientKnownRequestError('Credentials taken', 'P2002', '1.0');
      const exception = new ForbiddenException('Credentials taken');
      const throwErrorMock = jest.fn().mockRejectedValueOnce(error);
      prismaSvc.user.create = throwErrorMock;
      await expect(service.register(mockDto)).rejects.toEqual(exception);
    });
  });

  describe('login', () => {
    it('should call user.findUnique on prismaSvc', async () => {
      const data = {
        where: {
          email: mockDto.email,
        },
      };
      await service.login(mockDto);
      expect(prismaSvc.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaSvc.user.findUnique).toHaveBeenCalledWith(data);
    });
    it('should throw a ForbiddenException if the user is not found', async () => {
      const error = new ForbiddenException('Credentials Incorrect');
      prismaSvc.user.findUnique = jest.fn().mockReturnValueOnce(null);
      await expect(service.login(mockDto)).rejects.toEqual(error);
    });
    it('should call verify on argon with params', async () => {
      prismaSvc.user.findUnique = jest.fn().mockReturnValueOnce(mockUser);
      await service.login(mockDto);
      expect(argonMock.verify).toHaveBeenCalledTimes(1);
      expect(argonMock.verify).toHaveBeenCalledWith(mockUser.hash, mockDto.password);
    });
    it('should throw a ForbiddenException if password does not match', async () => {
      const error = new ForbiddenException('Credentials Incorrect');
      prismaSvc.user.findUnique = jest.fn().mockReturnValueOnce(mockUser);
      argonMock.verify.mockReturnValueOnce(false);
      await expect(service.login(mockDto)).rejects.toEqual(error);
    });
    it('should call and return the signToken with params', async () => {
      service.signToken = jest.fn().mockReturnValueOnce(mockUser);
      prismaSvc.user.findUnique = jest.fn().mockReturnValueOnce(mockUser);
      argonMock.verify = jest.fn().mockReturnValueOnce(true);
      const returnVal = await service.login(mockDto);
      expect(service.signToken).toHaveBeenCalledTimes(1);
      expect(service.signToken).toHaveBeenCalledWith(mockUser);
      expect(returnVal).toEqual(mockUser);
    });
  });

  describe('signToken', () => {
    it('should call signAsync on jwtSvc with params, and get on configSvc with params', async () => {
      const jwtPayload = {
        sub: mockUser.id,
        email: mockUser.email,
      };
      const jwtParam = {
        expiresIn: '60m',
        secret: '123',
      };
      await service.signToken(mockUser);
      expect(jwtMock.signAsync).toHaveBeenCalledTimes(1);
      expect(jwtMock.signAsync).toHaveBeenCalledWith(jwtPayload, jwtParam);
      expect(configMock.get).toHaveBeenCalledTimes(1);
      expect(configMock.get).toHaveBeenCalledWith('JWT_SECRET');
    });
    it('should return the user', async () => {
      const returnVal = await service.signToken(mockUser);
      expect(returnVal).toEqual(mockUser);
    });
  });
});
