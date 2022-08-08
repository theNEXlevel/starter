import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiBadRequestResponse,
  ApiConsumes,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { ErrorEntity, UserEntity } from '@starter/api-interfaces';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('auth')
@ApiBadRequestResponse({ status: 400, description: 'Data incorrect', type: ErrorEntity })
@Controller('auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'register a new user and login' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiCreatedResponse({ status: 201, description: 'Registered and logged in', type: UserEntity })
  @ApiBadRequestResponse({ status: 400, description: 'Data incorrect', type: ErrorEntity })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  register(@Body() dto: AuthDto) {
    return this.authSvc.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'login a user' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiCreatedResponse({ status: 201, description: 'Logged in', type: UserEntity })
  @ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
  login(@Body() dto: AuthDto) {
    return this.authSvc.login(dto);
  }
}
