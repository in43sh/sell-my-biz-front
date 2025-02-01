import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import HamburgerMenu from '../HamburgerMenu'; // adjust path if needed
import Logo from '../../assets/images/logo.svg'; // adjust path if needed
import AccountDropdown from '../AccountDropdown'; // adjust path if needed
import MobileMenu from '../MobileMenu'; // adjust path if needed

const Navbar = () => {
  // State for the mobile hamburger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State for the account dropdown menu (for both desktop and mobile)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const { isLoggedIn, clearUserSession } = useAuth();
  console.log('isLoggedIn ===> ', isLoggedIn);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccountMenu = () => setIsAccountMenuOpen(!isAccountMenuOpen);

  return (
    <>
      <nav className="bg-blue-600 p-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-12" />
          </Link>

          {/* Desktop Right Side: either Account dropdown or Sign In/Sign Up */}
          <div className="hidden items-center space-x-4 md:flex">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleAccountMenu}
                  className="text-white focus:outline-none"
                >
                  My Account
                </button>
                {isAccountMenuOpen && (
                  <AccountDropdown
                    onClose={() => setIsAccountMenuOpen(false)}
                    clearUserSession={clearUserSession}
                  />
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Hamburger menu for mobile */}
          <HamburgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </nav>

      {/* Mobile Menu (extracted to a separate component) */}
      {isMenuOpen && (
        <MobileMenu
          isLoggedIn={isLoggedIn}
          clearUserSession={clearUserSession}
          isAccountMenuOpen={isAccountMenuOpen}
          toggleAccountMenu={toggleAccountMenu}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
