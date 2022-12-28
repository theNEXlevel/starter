import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as argon from 'argon2';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'argon',
      useValue: argon,
    },
  ],
})
export class AuthModule {}
