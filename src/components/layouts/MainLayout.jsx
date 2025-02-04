import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
