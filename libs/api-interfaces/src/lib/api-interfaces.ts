import { User } from './prisma';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserEntity implements User {
  @ApiProperty()
  accessToken?: string;

  @ApiProperty()
  name!: string | null;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  hash!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class Login {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password!: string;
}

export class ErrorEntity {
  @ApiProperty({ required: false })
  error?: string;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'Array<string>' }],
  })
  message!: string[] | string;

  @ApiProperty({ required: false })
  statusCode?: number;
}
