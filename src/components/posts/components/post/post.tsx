import { HeartOutlined, StarOutlined } from '@ant-design/icons';
import { FC } from 'react';

import Avatar from '../../../avatar/avatar';
import { AVATAR_SIZE } from './constants';
import { IPostProps } from './post.interface';
import {
  Container,
  PostTitle,
  PostSubtitle,
  PostBody,
  FooterButtons,
  Author,
  PostFooter,
  StyledButton,
} from './styled';

const Post: FC<IPostProps> = ({ post }) => {
  const isLikesExists = post.likesAmount > 0;
  const isCommentsExists = post.commentsAmount > 0;

  return (
    <Container key={post.id}>
      <PostTitle>{post.title}</PostTitle>
      <PostSubtitle>{post.description}</PostSubtitle>
      <PostBody>{post.body}</PostBody>
      <PostFooter>
        <FooterButtons>
          <StyledButton>
            {isCommentsExists ? post.commentsAmount : 'No'} comments
          </StyledButton>
          <StyledButton>
            <HeartOutlined />
            {isLikesExists && <span> {post.likesAmount}</span>}
          </StyledButton>
          <StyledButton>
            <StarOutlined />
          </StyledButton>
        </FooterButtons>
        <Author>
          <Avatar size={AVATAR_SIZE} /> {post.author.username}
        </Author>
      </PostFooter>
    </Container>
  );
};

export default Post;
