import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@starter/api/prisma';
import { AuthModule } from '@starter/api/auth';
import { MailModule } from '../../../../libs/api/mail/src/lib/mail.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, MailModule],
})
export class AppModule {}
