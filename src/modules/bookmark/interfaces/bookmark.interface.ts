import { Document } from 'mongoose';

import { User } from 'src/modules/user/entities/user.entity';

export interface IBookmark extends Document {
  id: string;
  user: User;
  postId: string;
  createdAt: Date;
  isDeleted: boolean;
}
