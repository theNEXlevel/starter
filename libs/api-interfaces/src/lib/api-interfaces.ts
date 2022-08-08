import { User } from './prisma';
import { ApiProperty } from '@nestjs/swagger';

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

export interface Login {
  email: string;
  password: string;
}

export class ErrorEntity {
  @ApiProperty()
  error?: string;

  @ApiProperty({ type: [String] })
  message!: string[];

  @ApiProperty()
  statusCode?: number;
}
