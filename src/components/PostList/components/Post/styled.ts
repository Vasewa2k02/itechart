import { Layout } from 'antd';
import styled from 'styled-components';

import { COLORS } from 'enums/colors.enum';
import { COMMON_STYLES } from 'enums/common-styles.enum';

const Container = styled(Layout)({
  marginBottom: COMMON_STYLES.indentMedium,
  borderRadius: COMMON_STYLES.borderRadius,
  background: COLORS.background,
  color: COLORS.contentText,
});

const PostTitle = styled('div')({
  margin: COMMON_STYLES.indentMedium,
  textAlign: 'center',
  borderBottom: `1px solid ${COLORS.postBorder}`,
  fontSize: COMMON_STYLES.fontSizeMedium,
  fontWeight: COMMON_STYLES.fontWeightLarge,
});

const PostSubtitle = styled('div')({
  margin: `0px ${COMMON_STYLES.indentMedium}`,
  fontSize: COMMON_STYLES.fontSizeSmall,
  fontWeight: COMMON_STYLES.fontWeightLarge,
});

const PostBody = styled('div')({
  margin: COMMON_STYLES.indentMedium,
});

const PostFooter = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  margin: `0px ${COMMON_STYLES.indentMedium}`,
  borderTop: `1px solid ${COLORS.postBorder}`,
});

const FooterButtons = styled('div')({});

const StyledButton = styled('button')({
  height: COMMON_STYLES.buttonHeightSmall,
  margin: COMMON_STYLES.indentSmall,
  padding: `${COMMON_STYLES.indentMicro} ${COMMON_STYLES.indentSmall}`,
  border: 'none',
  borderRadius: COMMON_STYLES.borderRadius,
  backgroundColor: COLORS.defaultElement,
  color: COLORS.white,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: COLORS.defaultElementHover,
  },
  '&:active': {
    backgroundColor: COLORS.defaultElementActive,
  },
});

const Author = styled('p')({
  color: COLORS.textLight,
});

export {
  Container,
  PostTitle,
  PostSubtitle,
  PostBody,
  PostFooter,
  FooterButtons,
  StyledButton,
  Author,
};
