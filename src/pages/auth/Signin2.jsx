import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputField from '../../components/Form/InputField';
import useAuthForm from '../../hooks/useAuthForm';

const SignIn = () => {
  const { form, error, handleChange, handleSubmit } = useAuthForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const handleLoginSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">
          Sign In to Your Account
        </h2>

        <form
          onSubmit={(e) => handleSubmit(e, handleLoginSuccess)}
          className="space-y-4"
        >
          <InputField
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            error={error.email}
            onChange={handleChange}
            label="Email"
          />
          <InputField
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            error={error.password}
            onChange={handleChange}
            label="Password"
          />

          <button
            className="w-full cursor-pointer rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
