import Avatar from '../avatar/avatar';
import { ProfileProps } from './profile.interface';
import { StyledProfileLayout, StyledProfileName } from './styled';

const Profile = ({ avatarProps }: ProfileProps) => (
  <StyledProfileLayout>
    <Avatar size={avatarProps.size} />
    <StyledProfileName>50cent</StyledProfileName>
  </StyledProfileLayout>
);

export default Profile;
