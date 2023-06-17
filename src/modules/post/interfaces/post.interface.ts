import { Document } from 'mongoose';

import { Like } from 'src/modules/like/entities/like.entity';
import { Bookmark } from 'src/modules/bookmark/entities/bookmark.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { User } from 'src/modules/user/entities/user.entity';

export interface IPost extends Document {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  pathToMediaFile: string;
  author: User;
  likes: Like[];
  bookmarks: Bookmark[];
  comments: Comment[];
  createdAt: Date;
  isDeleted: boolean;
}
