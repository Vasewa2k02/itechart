import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { IUser } from '../interfaces/user.interface';

type UserRegistrationType = Pick<
  IUser,
  'email' | 'firstName' | 'password' | 'lastName'
>;

export class CreateUserDto implements UserRegistrationType {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsString()
  password: string;
}
