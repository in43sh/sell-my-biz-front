import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../../contexts/AccountProvider';

const EditButton = ({ id }) => {
  const navigate = useNavigate();
  const { setCurrentBusinessId } = useAccount();

  const handleEdit = () => {
    navigate('/account/edit-business');
    setCurrentBusinessId(id);
  };

  return (
    <button
      onClick={handleEdit}
      className="btn btn-sm btn-outline-primary d-flex align-items-center"
      style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', gap: '0.4rem' }}
    >
      <i className="fas fa-edit"></i> Edit
    </button>
  );
};

EditButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditButton;
