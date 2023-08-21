import { UserOutlined } from '@ant-design/icons';
import { Avatar as DefaultAvatar } from 'antd';

import { AvatarProps } from './avatar.interface';

const Avatar = ({ size }: AvatarProps) => (
  <DefaultAvatar size={size} icon={<UserOutlined />} />
);

export default Avatar;
