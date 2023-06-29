import { EntityFields } from 'common/types';

import { User } from '../entities/user.entity';

type UserEntity = Pick<
  User,
  | '_id'
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
  _id: '_id',
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
