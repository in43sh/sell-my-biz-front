import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  // console.log('isLoggedIn ===> ', isLoggedIn);

  if (!isLoggedIn) {
    return (
      <Navigate to="/sign-in" state={{ from: location.pathname }} replace />
    );
  }

  return element;
};

export default ProtectedRoute;
