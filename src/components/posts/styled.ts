import { Layout } from 'antd';
import styled from 'styled-components';

import { COLORS } from '../../enums/colors.enum';
import { COMMON_STYLES } from '../../enums/common-styles.enum';

const StyledContent = styled(Layout.Content)({
  minHeight: '280px',
  margin: '20px',
  borderRadius: COMMON_STYLES.borderRadius,
});

const StyledContentLayout = styled(Layout)({
  backgroundColor: COLORS.backgroundContent,
});

export { StyledContent, StyledContentLayout };
