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
    <div className="mt-10 flex min-h-screen w-full items-center justify-center bg-gray-200 pt-10 text-gray-900">
      <div className="w-full max-w-lg">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-4xl font-semibold">Sign In</h2>
          <form onSubmit={(e) => handleSubmit(e, handleLoginSuccess)}>
            <InputField
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={(form.email = 'test1@test.com')}
              error={error.email}
              onChange={handleChange}
              label="Email"
            />
            <InputField
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              value={(form.password = 'testtest')}
              error={error.password}
              onChange={handleChange}
              label="Password"
            />
            <button
              className="mt-4 w-full cursor-pointer rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
