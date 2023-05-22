import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { SALT } from 'src/common/constants/common';

import { IUser } from './interfaces/user.interface';
import { UserResponse } from './response/user.response';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = await this.userRepository.getUserByEmail(createUserDto.email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      Number(this.configService.get(SALT)),
    );

    await this.userRepository.createUser(v4(), createUserDto);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.getUserByEmail(email);
  }

  async getUserById(id: string): Promise<UserResponse | null> {
    return await this.userRepository.getUserById(id);
  }
}
