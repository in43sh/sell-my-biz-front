import { Link } from 'react-router-dom';
import InputField from '../../components/Form/InputField';
import useSignUpForm from '../../hooks/useSignUpForm';

const SignUp = () => {
  const { form, error, isLoading, handleChange, handleSubmit } =
    useSignUpForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-6">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={form.firstName}
            error={error.firstName}
            onChange={handleChange}
            label="First Name"
          />
          <InputField
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            error={error.lastName}
            onChange={handleChange}
            label="Last Name"
          />
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            error={error.email}
            onChange={handleChange}
            label="Email"
          />
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            error={error.password}
            onChange={handleChange}
            label="Password"
          />
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            error={error.confirmPassword}
            onChange={handleChange}
            label="Confirm Password"
          />

          {error.form && (
            <p className="mt-2 text-center text-sm text-red-500">
              {error.form}
            </p>
          )}

          <button
            className="w-full cursor-pointer rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
