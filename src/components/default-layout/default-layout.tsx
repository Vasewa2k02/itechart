import { Layout } from 'antd';

import Footer from '../footer/footer';
import Navigate from '../navigate/navigate';
import Sidebar from '../sidebar/sidebar';

const DefaultLayout = () => (
  <Layout>
    <Navigate />
    <Layout>
      <Sidebar />
    </Layout>
    <Footer />
  </Layout>
);

export default DefaultLayout;
