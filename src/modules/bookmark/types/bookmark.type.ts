import { EntityFields } from 'src/common/types';

import { Bookmark } from '../entities/bookmark.entity';

type BookmarkEntity = Pick<
  Bookmark,
  'id' | 'user' | 'post' | 'createdAt' | 'isDeleted'
>;

export const BOOKMARK_FIELDS: EntityFields<BookmarkEntity> = {
  id: 'id',
  user: 'user',
  post: 'post',
  createdAt: 'createdAt',
  isDeleted: 'isDeleted',
};
