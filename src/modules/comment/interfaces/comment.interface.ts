import { Document } from 'mongoose';

import { User } from 'src/modules/user/entities/user.entity';
import { Post } from 'src/modules/post/entities/post.entity';
import { Like } from 'src/modules/like/entities/like.entity';

export interface IComment extends Document {
  id: string;
  content: string;
  author: User;
  post: Post;
  likes: Like[];
  createdAt: Date;
  isDeleted: boolean;
}
