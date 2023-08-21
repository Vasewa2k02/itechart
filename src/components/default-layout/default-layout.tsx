import { Layout } from 'antd';

import { POSTS } from '../../constants/data.const';
import Footer from '../footer/footer';
import Navigate from '../navigate/navigate';
import Posts from '../posts/posts';
import Sidebar from '../sidebar/sidebar';

const DefaultLayout = () => (
  <Layout>
    <Navigate />
    <Layout>
      <Sidebar />
      <Posts posts={POSTS} />
    </Layout>
    <Footer />
  </Layout>
);

export default DefaultLayout;
