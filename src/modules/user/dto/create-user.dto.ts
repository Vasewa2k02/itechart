import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IUser } from '../interfaces/user.interface';

type UserRegistrationType = Pick<
  IUser,
  'email' | 'firstName' | 'password' | 'lastName'
>;

export class CreateUserDto implements UserRegistrationType {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
