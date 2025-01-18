import PropTypes from 'prop-types';

import Footer from './Footer';
import Topbar from './Topbar';

const MainLayout = ({ children }) => (
  <>
    <Topbar />
    {children}
    <Footer />
  </>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
