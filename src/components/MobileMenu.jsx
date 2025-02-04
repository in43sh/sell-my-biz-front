import { Link } from 'react-router-dom';

const MobileMenu = ({ isLoggedIn, clearUserSession, onClose }) => {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="space-y-4 bg-blue-600 p-4 md:hidden">
      {isLoggedIn ? (
        <div className="relative space-y-2">
          <Link
            to="/account/profile"
            className="block rounded-md px-4 py-2 text-white hover:bg-blue-700"
            onClick={handleLinkClick}
          >
            Profile
          </Link>
          <Link
            to="/account/add-business"
            className="block rounded-md px-4 py-2 text-white hover:bg-blue-700"
            onClick={handleLinkClick}
          >
            Add Business
          </Link>
          <Link
            to="/account/my-businesses"
            className="block rounded-md px-4 py-2 text-white hover:bg-blue-700"
            onClick={handleLinkClick}
          >
            My Businesses
          </Link>
          <button
            className="w-full rounded-md px-4 py-2 text-left text-white transition duration-300 hover:bg-red-600"
            onClick={clearUserSession}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <Link
            to="/sign-in"
            className="block rounded-md bg-blue-700 px-6 py-2 text-white transition duration-300 hover:bg-blue-800"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="block rounded-md bg-green-600 px-6 py-2 text-white transition duration-300 hover:bg-green-700"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
