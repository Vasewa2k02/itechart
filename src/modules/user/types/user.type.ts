import { EntityFields } from 'src/common/types';

import { User } from '../entities/user.entity';

type UserEntity = Pick<
  User,
  | 'id'
  | 'email'
  | 'password'
  | 'firstName'
  | 'lastName'
  | 'createdAt'
  | 'updatedAt'
  | 'role'
>;

export const USER_FIELDS: EntityFields<UserEntity> = {
  id: 'id',
  email: 'email',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  role: 'role',
};
