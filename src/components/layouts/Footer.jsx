import React from 'react';
import Logo from '../../assets/images/logo.svg';

const Footer = () => {
  return (
    <footer className="text-dark bg-white pt-5">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-lg-4 col-md-12 mb-4">
            <a href="/" className="text-decoration-none">
              <img
                src={Logo}
                alt="SellMyBiz"
                style={{
                  width: '200px',
                  height: 'auto',
                  display: 'block',
                  marginBottom: '20px',
                }}
              />
            </a>
            <p>
              Discover opportunities and grow your business with SellMyBiz.
              Connect with potential buyers and sellers in a seamless platform.
            </p>
            <p>
              <i className="fa fa-map-marker-alt text-primary mr-2"></i>123
              Business St, Startup City
            </p>
            <p>
              <i className="fa fa-envelope text-primary mr-2"></i>
              support@sellmybiz.com
            </p>
            <p>
              <i className="fa fa-phone-alt text-primary mr-2"></i>+1 800 123
              4567
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a className="text-dark" href="/">
                  <i className="fa fa-angle-right mr-2"></i>Home
                </a>
              </li>
              <li>
                <a className="text-dark" href="/about-us">
                  <i className="fa fa-angle-right mr-2"></i>About Us
                </a>
              </li>
              <li>
                <a className="text-dark" href="/businesses">
                  <i className="fa fa-angle-right mr-2"></i>Businesses
                </a>
              </li>
              <li>
                <a className="text-dark" href="/help">
                  <i className="fa fa-angle-right mr-2"></i>Help
                </a>
              </li>
              <li>
                <a className="text-dark" href="/contact">
                  <i className="fa fa-angle-right mr-2"></i>Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="font-weight-bold text-dark mb-4">Newsletter</h5>
            <p>Stay updated with our latest listings and offers.</p>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control rounded-0 border-0"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control rounded-0 border-0"
                  placeholder="Your Email"
                  required
                />
              </div>
              <button
                className="btn btn-primary btn-block rounded-0"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row border-top mt-4 pt-3">
          <div className="col-md-6 text-md-left mb-md-0 mb-3 text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()}{' '}
              <a href="/" className="text-dark font-weight-bold">
                SellMyBiz
              </a>
              . All Rights Reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-right text-center">
            <a href="/" className="text-dark mx-2">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" className="text-dark mx-2">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" className="text-dark mx-2">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="/" className="text-dark mx-2">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
