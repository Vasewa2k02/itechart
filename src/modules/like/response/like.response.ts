import { ApiProperty } from '@nestjs/swagger';

import { ILike } from '../interfaces/like.interface';
import { User } from 'modules/user/entities/user.entity';

export class LikeResponse
  implements Pick<ILike, 'id' | 'likedEntityId' | 'author'>
{
  @ApiProperty()
  id: string;

  @ApiProperty()
  likedEntityId: string;

  @ApiProperty()
  author: User;
}
