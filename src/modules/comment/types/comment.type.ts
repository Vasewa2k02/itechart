import { EntityFields } from 'common/types';

import { Comment } from '../entities/comment.entity';

type CommentEntity = Pick<
  Comment,
  'id' | 'content' | 'author' | 'post' | 'likes' | 'createdAt' | 'isDeleted'
>;

export const COMMENT_FIELDS: EntityFields<CommentEntity> = {
  id: 'id',
  content: 'content',
  author: 'author',
  post: 'post',
  likes: 'likes',
  createdAt: 'createdAt',
  isDeleted: 'isDeleted',
};
