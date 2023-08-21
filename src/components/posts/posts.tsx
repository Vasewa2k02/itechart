import { FC } from 'react';

import Post from './components/post/post';
import { IPostsProps } from './posts.interface';
import { Container } from './styled';

const Posts: FC<IPostsProps> = ({ posts }) => (
  <Container>
    {posts.map((post) => (
      <Post key={post.id} post={post} />
    ))}
  </Container>
);

export default Posts;
