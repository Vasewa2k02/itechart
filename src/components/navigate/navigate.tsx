import { Layout, Menu } from 'antd';
import { FC } from 'react';

import Logo from '../../assets/images/logo.png';
import { MENU_ITEMS, START_MENU_ITEM } from './constants';
import { StyledHeader, StyledLogo, StyledMenuItem } from './styled';

const Navigate: FC = () => (
  <Layout>
    <StyledHeader>
      <StyledLogo>
        <img src={Logo} alt='Yuzik.Net' />
        <span>Yuzik.Net</span>
      </StyledLogo>
      <Menu
        theme='light'
        mode='horizontal'
        defaultSelectedKeys={[START_MENU_ITEM]}
      >
        {MENU_ITEMS.map((item, index) => (
          <StyledMenuItem key={index}>{item}</StyledMenuItem>
        ))}
      </Menu>
    </StyledHeader>
  </Layout>
);

export default Navigate;
