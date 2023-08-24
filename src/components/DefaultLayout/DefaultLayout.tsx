import { Layout } from 'antd';

import { POSTS } from 'constants/data.const';

import Footer from '../Footer/Footer';
import Navigate from '../Navigate/Navigate';
import PostList from '../PostList/PostList';
import Sidebar from '../Sidebar/Sidebar';

const DefaultLayout = () => (
  <Layout>
    <Navigate />
    <Layout>
      <Sidebar />
      <PostList posts={POSTS} />
    </Layout>
    <Footer />
  </Layout>
);

export default DefaultLayout;
