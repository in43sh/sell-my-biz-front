import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import AccountLayout from '../components/layouts/AccountLayout';
import AddBusiness from '../pages/account/AddBusiness';
import Profile from '../pages/account/Profile';
import MyBusinesses from '../pages/account/MyBusinesses';
import EditBusiness from '../pages/account/EditBusiness';
import Businesses from '../pages/Businesses';
import BusinessDetail from '../pages/BusinessDetail';
import BusinessEvaluate from '../pages/BusinessEvaluate';
import ResetPassword from '../pages/auth/ResetPassword';
import ForgotPassword from '../pages/auth/ForgotPassword';
import PrivacyPolicy from '../pages/PrivacyPolicy2';
import AboutUs from '../pages/AboutUs';
import Help from '../pages/Help';
import ApiStatusCheck from '../pages/ApiStatusCheck';

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Account Routes */}
      <Route
        path="/account"
        element={<ProtectedRoute element={<AccountLayout />} />}
      >
        <Route path="add-business" element={<AddBusiness />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-businesses" element={<MyBusinesses />} />
        <Route path="edit-business" element={<EditBusiness />} />
      </Route>

      {/* Businesses Routes */}
      <Route path="/businesses" element={<Businesses />} />
      <Route path="/business/:id" element={<BusinessDetail />} />

      <Route path="/evaluate" element={<BusinessEvaluate />} />

      <Route path="/password/edit" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/help" element={<Help />} />
      <Route path="/api-status" element={<ApiStatusCheck />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
