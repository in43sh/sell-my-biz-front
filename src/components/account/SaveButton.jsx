// TO BE DELETED
import PropTypes from 'prop-types';

const SaveButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="ml-2 w-1/2 cursor-pointer rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
    >
      Save
    </button>
  );
};

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SaveButton;
