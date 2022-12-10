import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Login, User, UserEntity } from '@starter/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private prismaSvc: PrismaService,
    private jwtSvc: JwtService,
    private configSvc: ConfigService,
    @Inject('argon') private argon
  ) {}
  async register(dto: Login) {
    try {
      const hash = await this.argon.hash(dto.password);
      const user = await this.prismaSvc.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Username/Password invalid');
      }
      throw error;
    }
  }

  async login(dto: Login) {
    const user = await this.prismaSvc.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    const pwMatches = await this.argon.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Credentials Incorrect');
    }
    return this.signToken(user);
  }

  async signToken(user: User): Promise<UserEntity> {
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
