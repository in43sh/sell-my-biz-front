import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

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
