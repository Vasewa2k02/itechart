import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

import { IComment } from '../interfaces/comment.interface';

type CommentCreationType = Pick<IComment, 'content'>;

export class CreateCommentDto implements CommentCreationType {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  content: string;
}
