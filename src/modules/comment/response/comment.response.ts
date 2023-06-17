import { ApiProperty } from '@nestjs/swagger';

import { User } from 'src/modules/user/entities/user.entity';
import { Like } from 'src/modules/like/entities/like.entity';

import { Comment } from '../entities/comment.entity';

export class CommentResponse
  implements Pick<Comment, 'id' | 'author' | 'content' | 'likes'>
{
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  likes: Like[];
}
