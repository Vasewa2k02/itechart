import { EntityFields } from 'src/common/types';

import { Comment } from '../entities/comment.entity';

type PostEntity = Pick<
  Comment,
  'id' | 'content' | 'author' | 'post' | 'likes' | 'createdAt' | 'isDeleted'
>;

export const POST_FIELDS: EntityFields<PostEntity> = {
  id: 'id',
  content: 'content',
  author: 'author',
  post: 'post',
  likes: 'likes',
  createdAt: 'createdAt',
  isDeleted: 'isDeleted',
};
