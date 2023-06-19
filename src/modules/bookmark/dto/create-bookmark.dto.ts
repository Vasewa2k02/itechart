import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

import { IBookmark } from '../interfaces/bookmark.interface';

type BookmarkCreationType = Pick<IBookmark, 'postId'>;

export class CreateBookmarkDto implements BookmarkCreationType {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  postId: string;
}
