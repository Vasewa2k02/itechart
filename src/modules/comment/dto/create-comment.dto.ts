import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { User } from 'src/modules/user/entities/user.entity';
import { Post } from 'src/modules/post/entities/post.entity';

import { IComment } from '../interfaces/comment.interface';

type CommentCreationType = Pick<IComment, 'content' | 'author' | 'post'>;

export class CreateCommentDto implements CommentCreationType {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  @IsString()
  post: Post;
}
