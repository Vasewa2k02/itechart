import { createGlobalStyle } from 'styled-components';

import { COLORS } from './enums/colors.enum';

export const GlobalStyle = createGlobalStyle({
  margin: 0,
  padding: 0,
  backgroundColor: COLORS.backgroundContent,
});
