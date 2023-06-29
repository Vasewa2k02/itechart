import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role } from 'src/entities/role.entity';
import { ROLE_FIELDS } from 'src/entities/types/role.type';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';
import { UserResponse } from './response/user.response';
import { USER_FIELDS } from './types/user.type';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<IUser>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  async createUser(id: string, createUserDto: CreateUserDto): Promise<void> {
    const { role, ...createUserDtoWithoutRole } = createUserDto;

    const user = await this.userModel.create({
      [USER_FIELDS.id]: id,
      [USER_FIELDS.role]: await this.roleModel.findOne({
        [ROLE_FIELDS.title]: role.toUpperCase(),
      }),
      ...createUserDtoWithoutRole,
    });

    await this.roleModel.findOneAndUpdate(
      { [ROLE_FIELDS.title]: role.toUpperCase() },
      { $push: { [ROLE_FIELDS.users]: user } },
    );
  }

  async getUserById(id: string): Promise<UserResponse | null> {
    return await this.userModel.findOne({ [USER_FIELDS.id]: id }).populate({
      path: USER_FIELDS.role,
    });
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.findOne({ [USER_FIELDS.email]: email }).exec();
  }
}
