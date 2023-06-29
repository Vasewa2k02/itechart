import { Document } from 'mongoose';

import { User } from 'modules/user/entities/user.entity';

export interface ILike extends Document {
  _id: string;
  id: string;
  author: User;
  likedEntityId: string;
  createdAt: Date;
}
