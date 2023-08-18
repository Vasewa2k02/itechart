import { Layout } from 'antd';

import Navigate from '../navigate/navigate';
// import Posts from 'components/Posts';
// import Sidebar from 'components/Sidebar';

//import { POSTS } from '../../constants/data.const';
import { StyledContent, StyledContentLayout } from './styled';

const DefaultLayout = () => (
  <Layout>
    <Navigate />
    <Layout></Layout>
  </Layout>
);

// const DefaultLayout = () => (
//   <Layout>
//     <Navigate />
//     <Layout>
//       <Sidebar />
//       <StyledContent>
//         <Posts posts={POSTS} />
//       </StyledContent>
//       <Footer />
//     </Layout>
//   </Layout>
// );

export default DefaultLayout;
