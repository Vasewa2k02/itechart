import { ThemeConfig } from 'antd/es/config-provider';

import { COLORS } from '../enums/colors.enum';
import { COMMON_STYLES } from '../enums/common-styles.enum';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: COLORS.colorPrimary,
    fontFamily: COMMON_STYLES.defaultFont,
    colorText: COLORS.text,
  },
};
