import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true})
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true})
  password: string;
}
