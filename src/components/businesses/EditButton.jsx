import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../../contexts/AccountProvider';

const EditButton = ({ id }) => {
  const navigate = useNavigate();
  const { setCurrentBusinessId } = useAccount();

  const handleEdit = () => {
    setCurrentBusinessId(id);
    navigate('/account/edit-business');
  };

  return (
    <button
      onClick={handleEdit}
      className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-blue-700"
    >
      {/* <i className="fas fa-edit" /> */}
      Edit
    </button>
  );
};

EditButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditButton;
