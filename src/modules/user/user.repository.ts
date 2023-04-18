import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Role } from 'src/entities/role.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';
import { UserResponse } from './response/user.response';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<IUser>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
  ) {}

  public async createUser(
    id: string,
    createUserDto: CreateUserDto,
  ): Promise<void> {
    const { role, ...createUserDtoWithoutRole } = createUserDto;

    const user = await this.userModel.create({
      id,
      role: await this.roleModel.findOne({ title: role.toUpperCase() }),
      ...createUserDtoWithoutRole,
    });

    await this.roleModel.findOneAndUpdate(
      { title: role.toUpperCase() },
      { $push: { users: user } },
    );
  }

  public async getUserById(id: string): Promise<UserResponse | null> {
    return await this.userModel
      .findOne({ id })
      .populate({ path: 'role', populate: { path: 'permissions' } });
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.findOne({ email }).exec();
  }
}
