import { Document } from 'mongoose';

import { Role } from 'src/entities/role.entity';

export interface IUser extends Document {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
