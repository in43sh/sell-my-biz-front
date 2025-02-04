import { Link } from 'react-router-dom';
import InputField from '../../components/Form/InputField';
import useSignUpForm from '../../hooks/useSignUpForm';

const SignUp = () => {
  const { form, error, isLoading, handleChange, handleSubmit } =
    useSignUpForm();

  return (
    <div className="mt-10 flex min-h-screen w-full items-center justify-center bg-gray-200 pt-10 text-gray-900">
      <div className="w-full max-w-lg">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-4xl font-semibold">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <InputField
              id="firstName"
              type="text"
              placeholder="Your First Name"
              value={(form.firstName = 'test')}
              error={error.firstName}
              onChange={handleChange}
              label="First Name"
            />
            <InputField
              id="lastName"
              type="text"
              placeholder="Your Last Name"
              value={(form.lastName = 'test')}
              error={error.lastName}
              onChange={handleChange}
              label="Last Name"
            />
            <InputField
              id="email"
              type="email"
              placeholder="Your Email"
              value={(form.email = 'test@test.com')}
              error={error.email}
              onChange={handleChange}
              label="Email"
            />
            <InputField
              id="password"
              type="password"
              placeholder="Your Password"
              value={(form.password = 'testtest')}
              error={error.password}
              onChange={handleChange}
              label="Password"
            />
            <InputField
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={(form.confirmPassword = 'testtest')}
              error={error.confirmPassword}
              onChange={handleChange}
              label="Confirm Password"
            />
            <button
              className="mt-4 w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 disabled:bg-gray-400"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
