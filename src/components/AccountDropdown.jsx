import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const AccountDropdown = ({ onClose, clearUserSession }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Handler to detect clicks outside the dropdown container
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Attach the listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handler for link clicks that closes the dropdown
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
      className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white py-2 shadow-lg"
    >
      <Link
        to="/account/profile"
        onClick={handleLinkClick}
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      >
        Profile
      </Link>
      <Link
        to="/account/add-business"
        onClick={handleLinkClick}
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      >
        Add Business
      </Link>
      <Link
        to="/account/my-businesses"
        onClick={handleLinkClick}
        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
      >
        My Businesses
      </Link>
      <button
        onClick={handleLogoutClick}
        className="w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
      >
        Log Out
      </button>
    </div>
  );
};

export default AccountDropdown;
