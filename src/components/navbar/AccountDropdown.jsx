import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const AccountDropdown = ({ onClose, clearUserSession }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('.account-button') // Ignore clicks on "My Account"
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  const handleLogoutClick = () => {
    clearUserSession();
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-md"
    >
      <Link
        to="/account/profile"
        onClick={handleLinkClick}
        className="block rounded-t-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Profile
      </Link>
      <Link
        to="/account/add-business"
        onClick={handleLinkClick}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        Add Business
      </Link>
      <Link
        to="/account/my-businesses"
        onClick={handleLinkClick}
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
      >
        My Businesses
      </Link>
      <button
        onClick={handleLogoutClick}
        className="w-full cursor-pointer rounded-b-lg px-4 py-2 text-left text-gray-700 hover:bg-red-100"
      >
        Log Out
      </button>
    </div>
  );
};

AccountDropdown.propTypes = {
  onClose: PropTypes.func.isRequired,
  clearUserSession: PropTypes.func.isRequired,
};

export default AccountDropdown;
