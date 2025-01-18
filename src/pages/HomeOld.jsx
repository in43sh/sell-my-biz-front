import { useState } from 'react';

import { Link } from 'react-router-dom';

import HamburgerMenu from '../components/HamburgerMenu'; // Import the new HamburgerMenu component

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-white to-green-300 px-4">
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-100 via-white to-green-100">
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-2xl font-bold text-white">
            <Link to="/">Sell My Biz</Link>
          </div>
          <div className="hidden space-x-4 md:flex">
            <Link
              to="/sign-in"
              className="rounded-lg px-6 py-2 text-white transition duration-300 hover:bg-blue-700"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="rounded-lg px-6 py-2 text-white transition duration-300 hover:bg-green-700"
            >
              Sign Up
            </Link>
          </div>
          <HamburgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />{' '}
        </div>
      </nav>

      {isMenuOpen && (
        <div className="space-y-4 bg-blue-600 p-4 md:hidden">
          <Link
            to="/sign-in"
            className="block px-6 py-2 text-white transition duration-300 hover:bg-blue-700"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="block px-6 py-2 text-white transition duration-300 hover:bg-green-700"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-grow flex-col items-center justify-center px-4 py-16 md:py-24">
        <h1 className="mb-4 text-5xl font-extrabold text-blue-800">
          Welcome to <span className="text-green-600">Sell My Biz</span>
        </h1>
        <p className="mb-8 max-w-md text-center text-lg text-gray-700">
          Your one-stop solution for buying and selling businesses. Discover new
          opportunities or find the perfect buyer for your business.
        </p>
      </div>
    </div>
  );
};

export default Home;
