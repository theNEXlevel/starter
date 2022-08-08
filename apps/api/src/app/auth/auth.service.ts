import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UserEntity } from '@starter/api-interfaces';

@Injectable()
export class AuthService {
  constructor(private prismaSvc: PrismaService, private jwtSvc: JwtService, private configSvc: ConfigService) {}
  async register(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prismaSvc.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    const user = await this.prismaSvc.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    return this.signToken(user);
  }

  async signToken(user: UserEntity): Promise<UserEntity> {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwtSvc.signAsync(payload, {
      expiresIn: '60m',
      secret: this.configSvc.get('JWT_SECRET'),
    });

    delete user.hash;

    return {
      ...user,
      accessToken: token,
    };
  }
}
