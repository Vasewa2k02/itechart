import { IPost } from '../types/post.interface';

export const POSTS: IPost[] = [
  {
    id: 'qwe1',
    author: {
      id: 'qwe1a',
      username: 'dapo',
    },
    title: "I've just signed up!!! Meet me! (title)",
    description: "I've just signed up!!! Meet me! (this is description)",
    body: 'Cheers, guys!',
    likesAmount: 4,
    commentsAmount: 2,
  },
  {
    id: 'qwe2',
    author: {
      id: 'qwe1a',
      username: 'dapo',
    },
    title: "I've just signed up!!! Meet me! (title) (second dapo's post)",
    description: "I've just signed up!!! Meet me! (this is description)",
    body: 'Cheers, guys!',
    likesAmount: 41,
    commentsAmount: 5,
  },
  {
    id: 'qwe3',
    author: {
      id: 'qwe2a',
      username: 'vasewa',
    },
    title: "I've just signed up!!! Meet me! (title)",
    description: "I've just signed up!!! Meet me! (this is description)",
    body: 'Cheers, guys!',
    likesAmount: 4,
    commentsAmount: 2,
  },
  {
    id: 'qwe4',
    author: {
      id: 'qwe2a',
      username: 'vasewa',
    },
    title: "I've just signed up!!! Meet me! (title)",
    description: "I've just signed up!!! Meet me! (this is description)",
    body: 'Cheers, guys! (second vasewa`s post)',
    likesAmount: 4,
    commentsAmount: 2,
  },
];
