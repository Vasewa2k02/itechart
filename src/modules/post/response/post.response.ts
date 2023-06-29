import { ApiProperty } from '@nestjs/swagger';

import { Like } from 'modules/like/entities/like.entity';
import { Comment } from 'modules/comment/entities/comment.entity';

import { Post } from '../entities/post.entity';

export class PostResponse
  implements
    Pick<
      Post,
      | 'id'
      | 'title'
      | 'subtitle'
      | 'content'
      | 'pathToMediaFile'
      | 'likes'
      | 'comments'
    >
{
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  pathToMediaFile: string;

  @ApiProperty()
  likes: Like[];

  @ApiProperty()
  comments: Comment[];
}
