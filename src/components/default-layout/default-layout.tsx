import { Layout } from 'antd';

import Footer from '../footer/footer';
import Navigate from '../navigate/navigate';

const DefaultLayout = () => (
  <Layout>
    <Navigate />
    <Footer />
  </Layout>
);

export default DefaultLayout;
