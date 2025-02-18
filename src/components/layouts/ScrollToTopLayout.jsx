import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTopLayout = ({ children }) => {
  const navigationType = useNavigationType();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, navigationType]);

  return <>{children}</>;
};

ScrollToTopLayout.propTypes = {
  children: PropTypes.node,
};

export default ScrollToTopLayout;
