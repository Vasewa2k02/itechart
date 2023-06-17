import { EntityFields } from 'src/common/types';

import { User } from '../entities/user.entity';

type UserEntity = Pick<
  User,
  | 'id'
  | 'email'
  | 'password'
  | 'firstName'
  | 'lastName'
  | 'posts'
  | 'comments'
  | 'likes'
  | 'bookmarks'
  | 'createdAt'
  | 'updatedAt'
  | 'role'
  | 'isDeleted'
>;

export const USER_FIELDS: EntityFields<UserEntity> = {
  id: 'id',
  email: 'email',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  posts: 'posts',
  comments: 'comments',
  likes: 'likes',
  bookmarks: 'bookmarks',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  role: 'role',
  isDeleted: 'isDeleted',
};
