import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

const ConfigServiceProvider = {
  provide: ConfigService,
  useFactory: () => ({
    get: jest.fn().mockReturnValue('secret'),
  }),
};

describe('PrismaService', () => {
  let service: PrismaService;
  let configSvc: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ConfigServiceProvider],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
    configSvc = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call get on configSvc with params', () => {
    expect(configSvc.get).toHaveBeenCalledTimes(1);
    expect(configSvc.get).toHaveBeenCalledWith('DATABASE_URL');
  });

  describe('cleanDb', () => {
    it('should call $transaction with params', () => {
      service.$transaction = jest.fn().mockReturnValueOnce('123');
      service.user.deleteMany = jest.fn().mockReturnValueOnce('123');
      expect(service.cleanDb()).toEqual('123');
      expect(service.$transaction).toHaveBeenCalledTimes(1);
      expect(service.$transaction).toHaveBeenCalledWith(['123']);
      expect(service.user.deleteMany).toHaveBeenCalledTimes(1);
    });
  });
});
