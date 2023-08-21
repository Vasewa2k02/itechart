import { UserOutlined } from '@ant-design/icons';
import { Avatar as DefaultAvatar } from 'antd';
import { FC } from 'react';

import { IAvatarProps } from './avatar.interface';

const Avatar: FC<IAvatarProps> = ({ size }) => (
  <DefaultAvatar size={size} icon={<UserOutlined />} />
);

export default Avatar;
