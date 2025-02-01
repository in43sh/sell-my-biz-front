import { useState } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu'; // adjust path if needed
import Logo from '../../assets/images/logo.svg'; // adjust path if needed

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-12" />
          </Link>

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

          <HamburgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
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
    </>
  );
};

export default Navbar;
