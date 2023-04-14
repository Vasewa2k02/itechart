import { Document } from 'mongoose';
import { Role } from 'src/entities/role.entity';

export interface IUser extends Document {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: Role;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
