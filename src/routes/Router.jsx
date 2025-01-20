import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

// Auth pages
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';

// Account pages
import Account from '../pages/account/Account';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Account */}
      <Route
        path="/account"
        element={<ProtectedRoute element={<Account />} />}
      />

      {/* 404 Not Found */}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
