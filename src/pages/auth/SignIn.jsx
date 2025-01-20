import { Link } from 'react-router-dom';
import useAuthForm from '../../hooks/useAuthForm';
import InputField from '../../components/Form/InputField';

const SignIn = () => {
  const {
    form,
    error,
    // isLoading,
    handleChange,
    handleSubmit,
  } = useAuthForm();

  return (
    <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-6 col-md-12 mx-auto">
          <div className="card mb-4 border-0">
            <div className="card-body p-5 text-center">
              <h2 className="display-5 font-weight-semi-bold mb-4">Sign In</h2>
              <form onSubmit={handleSubmit}>
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
                <button
                  className="btn btn-primary btn-block border-0 py-3"
                  type="submit"
                >
                  Sign In
                </button>
              </form>
              <p className="mt-4">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
