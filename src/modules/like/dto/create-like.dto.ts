import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty } from 'class-validator';

import { ILike } from '../interfaces/like.interface';

type LikeCreationType = Pick<ILike, 'likedEntityId'>;

export class CreateLikeDto implements LikeCreationType {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  likedEntityId: string;
}
