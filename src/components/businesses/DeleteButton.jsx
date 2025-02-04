import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from './Modal';
import { deleteBusiness } from '../../api/DBRequests';
import { useAuth } from '../../contexts/AuthProvider';

const DeleteButton = ({ id, name, updateList }) => {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleButton = () => setIsOpen(true);

  const handleDelete = async () => {
    try {
      await deleteBusiness(id, token);
      setIsOpen(false);
      updateList();
    } catch (error) {
      console.error('Failed to delete business:', error);
    }
  };

  const handleCancel = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={handleButton}
        className="flex cursor-pointer items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-red-700"
      >
        {/* <i className="fas fa-trash" /> */}
        Delete
      </button>
      <Modal
        isOpen={isOpen}
        onDelete={handleDelete}
        onClose={handleCancel}
        title="Delete Business"
        description={`Are you sure you want to permanently delete "${name}"?`}
      />
    </>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateList: PropTypes.func.isRequired,
};

export default DeleteButton;
