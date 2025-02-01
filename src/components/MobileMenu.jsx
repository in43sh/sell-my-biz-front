import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AccountDropdown from './AccountDropdown'; // adjust path as needed

const MobileMenu = ({
  isLoggedIn,
  clearUserSession,
  // isAccountMenuOpen,
  // toggleAccountMenu,
  onClose, // function to close the mobile menu
}) => {
  const handleLinkClick = () => {
    onClose();
  };
  // const location = useLocation();

  // When the location changes (i.e. a navigation occurs),
  // automatically call onClose() to close the mobile menu.
  // useEffect(() => {
  //   onClose();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location]);

  return (
    <div className="space-y-4 bg-blue-600 p-4 md:hidden">
      {isLoggedIn ? (
        <div className="relative">
          {/* <button
            onClick={toggleAccountMenu}
            className="block px-6 py-2 text-white transition duration-300 hover:bg-blue-700"
          >
            My Account
          </button>
          {isAccountMenuOpen && (
            <AccountDropdown
              onClose={() => {}}
              clearUserSession={clearUserSession}
            />
          )} */}

          <Link
            to="/account/profile"
            className="block px-4 py-2 text-white"
            onClick={handleLinkClick}
          >
            Profile
          </Link>
          <Link
            to="/account/add-business"
            className="block px-4 py-2 text-white"
            onClick={handleLinkClick}
          >
            Add Business
          </Link>
          <Link
            to="/account/my-businesses"
            className="block px-4 py-2 text-white"
            onClick={handleLinkClick}
          >
            My Businesses
          </Link>
          <button
            className="w-full px-4 py-2 text-left text-white hover:underline"
            onClick={clearUserSession}
            // onClick={handleLinkClick}
          >
            Log Out
          </button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default MobileMenu;
