import Logo from '../../assets/images/logo.png';
import { StyledFooter, StyledLogo } from './styled';

const Footer = () => (
  <StyledFooter>
    <div>&copy; 2023 Yuzik.Net</div>
    <StyledLogo src={Logo} alt='Yuzik.Net' />
    <div>
      Author: &nbsp;
      <a href='https://github.com/Vasewa2k02'>Vasewa2k02</a>
    </div>
  </StyledFooter>
);

export default Footer;
