import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthProvider';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/sign-in" replace />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node,
};

export default ProtectedRoute;
