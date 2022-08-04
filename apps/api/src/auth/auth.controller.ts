import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authSvc.register(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authSvc.login(dto);
  }
}
