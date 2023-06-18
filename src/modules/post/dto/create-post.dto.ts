import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

import { IPost } from '../interfaces/post.interface';

type PostCreationType = Pick<
  IPost,
  'title' | 'subtitle' | 'content' | 'pathToMediaFile'
>;

export class CreatePostDto implements PostCreationType {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  pathToMediaFile: string;
}
