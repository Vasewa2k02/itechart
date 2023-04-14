import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from 'src/entities/permission.entity';
import { Role } from 'src/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserResponse } from './response/user.response';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    @InjectModel('Permission')
    private readonly permissionModel: Model<Permission>,
    @InjectModel('Role') private readonly roleModel: Model<Role>,
  ) {}

  public async createUser(
    id: string,
    createUserDto: CreateUserDto,
  ): Promise<void> {
    const { role, ...createUserDtoWithoutRole } = createUserDto;

    const roleEntity = await this.roleModel.findOne({
      title: role.toUpperCase(),
    });

    const user = await this.userModel.create({
      id,
      role: roleEntity,
      ...createUserDtoWithoutRole,
    });

    roleEntity?.users.push(user);
    await roleEntity?.save();
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
