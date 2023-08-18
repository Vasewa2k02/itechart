import { Footer } from 'antd/es/layout/layout';
import styled from 'styled-components';

const StyledFooter = styled(Footer)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledLogo = styled('img')({
  width: '30px',
  height: '30px',
});

export { StyledFooter, StyledLogo };
