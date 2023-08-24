import { Footer } from 'antd/es/layout/layout';
import styled from 'styled-components';

import { COLORS } from 'enums/colors.enum';

const StyledFooter = styled(Footer)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: COLORS.background,
});

const StyledLogo = styled('img')({
  width: '30px',
  height: '30px',
});

export { StyledFooter, StyledLogo };
