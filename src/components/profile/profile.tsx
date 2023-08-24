import { FC } from 'react';

import Avatar from 'components/Avatar/Avatar';

import { IProfileProps } from './profile.interface';
import { StyledProfileLayout, StyledProfileName } from './styled';

const Profile: FC<IProfileProps> = ({ avatarProps }) => (
  <StyledProfileLayout>
    <Avatar size={avatarProps.size} />
    <StyledProfileName>50cent</StyledProfileName>
  </StyledProfileLayout>
);

export default Profile;
