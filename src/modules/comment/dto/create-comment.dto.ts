import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IComment } from '../interfaces/comment.interface';

type CommentCreationType = Pick<IComment, 'content'>;

export class CreateCommentDto implements CommentCreationType {
  @ApiProperty()
  @IsString()
  content: string;
}
