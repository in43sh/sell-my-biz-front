import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import { useAuth } from '../../contexts/AuthProvider';

const Topbar = () => {
  const { clearUserSession } = useAuth();
  return (
    <div className="container-fluid">
      <div className="row bg-secondary px-xl-5 py-2">
        <div className="col-lg-6 d-none d-lg-block">
          <div className="d-inline-flex align-items-center">
            <Link className="text-dark" to="/">
              FAQs
            </Link>
            <span className="text-muted px-2">|</span>
            <Link className="text-dark" to="/">
              Help
            </Link>
            <span className="text-muted px-2">|</span>
            <Link className="text-dark" to="/">
              Support
            </Link>
            <span className="text-muted px-2">|</span>
            <Link className="text-dark" to="/account/profile">
              Account
            </Link>
            <span className="text-muted px-2">|</span>
            <Link className="text-dark" to="/sign-up">
              Sign up
            </Link>
            <span className="text-muted px-2">|</span>
            <Link className="text-dark" to="/sign-in">
              Log in
            </Link>
            <span className="text-muted px-2">|</span>
            <p className="text-dark" type="button" onClick={clearUserSession}>
              Log out
            </p>
          </div>
        </div>
        <div className="col-lg-6 text-lg-right text-center">
          <div className="d-inline-flex align-items-center">
            <Link className="text-dark px-2" to="/">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link className="text-dark px-2" to="/">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link className="text-dark px-2" to="/">
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link className="text-dark px-2" to="/">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link className="text-dark pl-2" to="/">
              <i className="fab fa-youtube"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="row align-items-center px-xl-5 py-3">
        <div className="col-lg-3 d-none d-lg-block">
          <Link to="/" className="text-decoration-none">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="col-lg-6 col-6 text-left">
          <form action="">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products"
              />
              <div className="input-group-append">
                <span className="input-group-text text-primary bg-transparent">
                  <i className="fa fa-search"></i>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-3 col-6 text-right">
          <Link to="/" className="btn border">
            <i className="fas fa-heart text-primary"></i>
            <span className="badge">0</span>
          </Link>
          <Link to="/" className="btn border">
            <i className="fas fa-shopping-cart text-primary"></i>
            <span className="badge">0</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
