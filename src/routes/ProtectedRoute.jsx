import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate to="/signin" state={{ from: location.pathname }} replace />
    );
  }

  return element;
};

export default ProtectedRoute;
