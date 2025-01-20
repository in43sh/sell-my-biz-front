import { Link } from 'react-router-dom';
import useSignUpForm from '../../hooks/useSignUpForm';
import InputField from '../../components/Form/InputField';

const SignUpPage = () => {
  const { form, error, isLoading, handleChange, handleSubmit } =
    useSignUpForm();

  return (
    <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-6 col-md-12 mx-auto">
          <div className="card mb-4 border-0">
            <div className="card-body p-5 text-center">
              <h2 className="display-5 font-weight-semi-bold mb-4">Sign Up</h2>
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
                  value={(form.email = 'test1@test.com')}
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
                  className="btn btn-primary btn-block border-0 py-3"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </form>
              <p className="mt-4">
                Already have an account?{' '}
                <Link to="/signin" className="text-primary">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
