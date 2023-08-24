import { ConfigProvider } from 'antd';

import DefaultLayout from './components/DefaultLayout/DefaultLayout';
import { themeConfig } from './config/theme.config';
import { GlobalStyle } from './styled';
import './styles.css';

const App = (): JSX.Element => (
  <ConfigProvider theme={themeConfig}>
    <GlobalStyle />
    <DefaultLayout />
  </ConfigProvider>
);

export default App;
