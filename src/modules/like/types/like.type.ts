import { EntityFields } from 'common/types';

import { Like } from '../entities/like.entity';

type LikeEntity = Pick<Like, 'id' | 'author' | 'likedEntity' | 'createdAt'>;

export const LIKE_FIELDS: EntityFields<LikeEntity> = {
  id: 'id',
  author: 'author',
  likedEntity: 'likedEntity',
  createdAt: 'createdAt',
};
