import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Top Navigation Bar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: '#007bff' }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            BizBuySell
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/businesses">
                  Businesses
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sell">
                  Sell Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              {/* Add more nav items as needed */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        style={{
          backgroundImage: 'url("https://via.placeholder.com/1500x600")', // Replace with your desired image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '600px',
          position: 'relative',
        }}
      >
        {/* Dark overlay to enhance text visibility */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        ></div>

        <div
          className="d-flex flex-column justify-content-center align-items-center container h-100"
          style={{ position: 'relative', zIndex: 2 }}
        >
          <h1
            className="mb-4 text-center text-white"
            style={{ fontSize: '3rem' }}
          >
            Find Your Perfect Business
          </h1>
          <p
            className="mb-4 text-center text-white"
            style={{ fontSize: '1.25rem' }}
          >
            Search among thousands of businesses for sale and discover
            opportunities today!
          </p>
          <div
            className="input-group"
            style={{ maxWidth: '600px', width: '100%' }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search businesses..."
              aria-label="Search businesses"
            />
            <button className="btn btn-light" type="button">
              Search
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;
