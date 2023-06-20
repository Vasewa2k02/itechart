import { ApiProperty } from '@nestjs/swagger';

import { User } from 'src/modules/user/entities/user.entity';
import { Post } from 'src/modules/post/entities/post.entity';

import { Bookmark } from '../entities/bookmark.entity';

export class BookmarkResponse
  implements Pick<Bookmark, 'id' | 'user' | 'post'>
{
  @ApiProperty()
  id: string;

  @ApiProperty()
  post: Post;

  @ApiProperty()
  user: User;
}
