import { FC } from 'react';

import Profile from '../profile/profile';
import {
  AVATAR_SIZE,
  MENU_ITEMS,
  SIDER_WIDTH,
  START_MENU_ITEM,
} from './constants';
import { StyledMenu, StyledMenuItem, StyledSider } from './styled';

const Sidebar: FC = () => (
  <StyledSider width={SIDER_WIDTH}>
    <Profile avatarProps={{ size: AVATAR_SIZE }} />
    <StyledMenu defaultSelectedKeys={[START_MENU_ITEM]}>
      {MENU_ITEMS.map((item, index) => (
        <StyledMenuItem key={index}>{item}</StyledMenuItem>
      ))}
    </StyledMenu>
  </StyledSider>
);

export default Sidebar;
