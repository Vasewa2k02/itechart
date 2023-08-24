import { FC } from 'react';

import Post from './components/Post/Post';
import { IPostsProps } from './posts.interface';
import { Container } from './styled';

const PostList: FC<IPostsProps> = ({ posts }) => (
  <Container>
    {posts.map((post) => (
      <Post key={post.id} post={post} />
    ))}
  </Container>
);

export default PostList;
