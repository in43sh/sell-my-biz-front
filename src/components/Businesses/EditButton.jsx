import PropTypes from 'prop-types';
import { useAccount } from '../../contexts/AccountProvider';

const EditButton = ({ id }) => {
  const { setAccountPage, setCurrentBusinessId } = useAccount();

  const handleEdit = () => {
    setAccountPage('editBusiness');
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
