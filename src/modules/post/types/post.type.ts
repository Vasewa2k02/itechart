import { EntityFields } from 'common/types';

import { Post } from '../entities/post.entity';

type PostEntity = Pick<
  Post,
  | 'id'
  | 'title'
  | 'subtitle'
  | 'content'
  | 'pathToMediaFile'
  | 'author'
  | 'likes'
  | 'bookmarks'
  | 'comments'
  | 'createdAt'
  | 'isDeleted'
>;

export const POST_FIELDS: EntityFields<PostEntity> = {
  id: 'id',
  title: 'title',
  subtitle: 'subtitle',
  content: 'content',
  pathToMediaFile: 'pathToMediaFile',
  author: 'author',
  likes: 'likes',
  bookmarks: 'bookmarks',
  comments: 'comments',
  createdAt: 'createdAt',
  isDeleted: 'isDeleted',
};
