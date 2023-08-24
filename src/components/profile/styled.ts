import { Layout } from 'antd';
import styled from 'styled-components';

import { COLORS } from 'enums/colors.enum';
import { COMMON_STYLES } from 'enums/common-styles.enum';

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

export { StyledProfileLayout, StyledProfileName };
