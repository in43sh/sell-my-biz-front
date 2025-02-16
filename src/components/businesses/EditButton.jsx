import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const EditButton = ({ id }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/account/edit-business/${id}`);
  };

  return (
    <button
      onClick={handleEdit}
      className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-blue-700"
    >
      Edit
    </button>
  );
};

EditButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditButton;
