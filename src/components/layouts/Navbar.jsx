import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import HamburgerMenu from '../navbar/HamburgerMenu';
import Logo from '../../assets/images/logo.svg';
import AccountDropdown from '../navbar/AccountDropdown';
import MobileMenu from '../navbar/MobileMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const { isLoggedIn, clearUserSession } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleAccountMenu = (event) => {
    event.stopPropagation();
    setIsAccountMenuOpen((prev) => !prev);
  };

  const handleAccountMenuClose = () => {
    if (isAccountMenuOpen) {
      setIsAccountMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-12" />
          </Link>

          <div className="hidden items-center space-x-4 md:flex">
            <Link
              to="/account/add-business"
              className="rounded-md bg-blue-700 px-5 py-2 font-medium text-white transition duration-300 hover:bg-blue-800"
            >
              List Your Business
            </Link>
            <Link
              to="/evaluate"
              className="rounded-md bg-blue-700 px-5 py-2 font-medium text-white transition duration-300 hover:bg-blue-800"
            >
              Evaluate Your Business
            </Link>
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleAccountMenu}
                  className="cursor-pointer font-semibold text-white focus:outline-none"
                >
                  My Account
                </button>
                {isAccountMenuOpen && (
                  <AccountDropdown
                    onClose={handleAccountMenuClose}
                    clearUserSession={clearUserSession}
                  />
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="rounded-md bg-blue-700 px-6 py-2 text-white transition duration-300 hover:bg-blue-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md bg-green-600 px-6 py-2 text-white transition duration-300 hover:bg-green-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <HamburgerMenu toggleMenu={toggleMenu} />
        </div>
      </nav>

      {isMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          clearUserSession={clearUserSession}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
