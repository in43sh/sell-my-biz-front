import PropTypes from 'prop-types';

const HamburgerMenu = ({ toggleMenu }) => {
  return (
    <button
      className="cursor-pointer text-white focus:outline-none md:hidden"
      onClick={toggleMenu}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-7 w-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};

HamburgerMenu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};

export default HamburgerMenu;
