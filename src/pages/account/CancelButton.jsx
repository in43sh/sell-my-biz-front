import PropTypes from 'prop-types';

const CancelButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-1/2 rounded-md bg-gray-300 py-2 font-semibold text-gray-700 transition hover:bg-gray-400"
    >
      Cancel
    </button>
  );
};

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CancelButton;
