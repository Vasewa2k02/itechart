import { IAuthor } from './author.interface';

export interface IPost {
  id: string;
  author: IAuthor;
  title: string;
  description: string;
  body: string;
  likesAmount: number;
  commentsAmount: number;
}
