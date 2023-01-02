import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiConsumes,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { ErrorEntity, Login, UserEntity } from '@starter/interfaces';
import { AuthService } from './auth.service';

@ApiTags('auth')
@ApiBadRequestResponse({ status: 400, description: 'Data incorrect', type: ErrorEntity })
@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'register a new user and send confirmation email' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiCreatedResponse({ status: 201, description: 'Registered and email sent', type: Boolean })
  @ApiBadRequestResponse({ status: 400, description: 'Data incorrect', type: ErrorEntity })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  register(@Body() dto: Login) {
    return this.authSvc.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'login a user' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiCreatedResponse({ status: 201, description: 'Logged in', type: UserEntity })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  login(@Body() dto: Login) {
    return this.authSvc.login(dto);
  }
}
