import PropTypes from 'prop-types';

import Footer from './Footer';
// import Topbar from './Topbar';
import Navbar from './Navbar';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
