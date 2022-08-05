import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configSvc: ConfigService) {
    super({
      datasources: {
        db: {
          url: configSvc.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([this.user.deleteMany()]);
  }
}
