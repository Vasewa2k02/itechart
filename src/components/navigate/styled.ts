import { Menu, Layout } from 'antd';
import styled from 'styled-components';

import { COLORS } from '../../enums/colors.enum';
import { COMMON_STYLES } from '../../enums/common-styles.enum';

const StyledHeader = styled(Layout.Header)({
  zIndex: 1,
  paddingInline: 0,
  background: COLORS.background,
});

const StyledLogo = styled('div')({
  float: 'left',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '280px',
  fontSize: COMMON_STYLES.fontSizeLarge,
  fontWeight: COMMON_STYLES.fontWeightBold,
  fontFamily: COMMON_STYLES.specialFont,
  color: COLORS.logo,
  textAlign: 'center',
  '& img': {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
});

const StyledMenuItem = styled(Menu.Item)({
  fontSize: COMMON_STYLES.fontSizeMedium,
  fontWeight: COMMON_STYLES.fontWeightMedium,
});

export { StyledHeader, StyledLogo, StyledMenuItem };
