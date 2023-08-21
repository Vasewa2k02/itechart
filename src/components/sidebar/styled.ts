import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import styled from 'styled-components';

import { COLORS } from '../../enums/colors.enum';
import { COMMON_STYLES } from '../../enums/common-styles.enum';

const StyledSider = styled(Sider)({
  height: '100%',
});

const StyledProfileLayout = styled(Layout)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: COMMON_STYLES.indentMedium,
  color: COLORS.profileName,
  borderBottom: `1px solid ${COLORS.siderBorder}`,
  backgroundColor: COLORS.background,
});

const StyledProfileName = styled('h3')({
  fontSize: COMMON_STYLES.fontSizeMedium,
  fontWeight: COMMON_STYLES.fontWeightLarge,
});

const StyledMenu = styled(Menu)({
  padding: COMMON_STYLES.indentMedium,
});

const StyledMenuItem = styled(Menu.Item)({
  fontWeight: COMMON_STYLES.fontWeightMedium,
});

export {
  StyledSider,
  StyledProfileLayout,
  StyledMenu,
  StyledMenuItem,
  StyledProfileName,
};
