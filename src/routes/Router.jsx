import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import AccountLayout from '../components/layouts/AccountLayout';
import AddBusiness from '../pages/account/AddBusiness';
import Profile from '../pages/account/Profile';
import MyBusinesses from '../pages/account/MyBusinesses';

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* Protected Account Routes */}
      <Route
        path="/account"
        element={<ProtectedRoute element={<AccountLayout />} />}
      >
        <Route path="add-business" element={<AddBusiness />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-businesses" element={<MyBusinesses />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
