import { useState } from 'react';

import { Link } from 'react-router-dom';

import HamburgerMenu from '../../components/HamburgerMenu';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    // console.log('Email:', email);
    // console.log('Password:', password);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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

      {/* Mobile Menu */}
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

      {/* Sign In Form Section */}
      <div className="flex flex-grow flex-col items-center justify-center px-4 py-16 md:py-24">
        <h2 className="mb-6 text-4xl font-extrabold text-blue-800">Sign In</h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-6 rounded-lg bg-white p-8 shadow-lg"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-lg font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-lg font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white transition duration-300 hover:bg-blue-700 focus:outline-none"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-blue-600 hover:text-blue-700">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
