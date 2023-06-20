import { Document } from 'mongoose';

import { Role } from 'src/entities/role.entity';
import { Bookmark } from 'src/modules/bookmark/entities/bookmark.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { Like } from 'src/modules/like/entities/like.entity';
import { Post } from 'src/modules/post/entities/post.entity';

export interface IUser extends Document {
  _id: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  posts: Post[];
  comments: Comment[];
  likes: Like[];
  bookmarks: Bookmark[];
}
