import { ConfigProvider } from 'antd';

import DefaultLayout from './components/default-layout/default-layout';
import { themeConfig } from './config/theme.config';
import { GlobalStyle } from './styled';

const App = (): JSX.Element => (
  <ConfigProvider theme={themeConfig}>
    <GlobalStyle />
    <DefaultLayout />
  </ConfigProvider>
);

export default App;
