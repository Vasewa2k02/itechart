import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interface';
import { UserResponse } from './response/user.response';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}
  public async create(createUserDto: CreateUserDto): Promise<void> {
    if (await this.userRepository.getUserByEmail(createUserDto.email)) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      +this.configService.get('SALT'),
    );

    await this.userRepository.createUser(v4(), createUserDto);
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.getUserByEmail(email);
  }

  public async getUserById(id: string): Promise<UserResponse | null> {
    return await this.userRepository.getUserById(id);
  }
}
