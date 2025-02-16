import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { deleteBusiness, markBusinessAsSold } from '../../api/DBRequests';
import DeleteModal from './DeleteModal';

const DeleteButton = ({ id, name, updateList }) => {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleButton = () => setIsOpen(true);

  const handleAction = async (action) => {
    try {
      if (action === 'sell') {
        await markBusinessAsSold(id, token);
      } else if (action === 'delete') {
        await deleteBusiness(id, token);
      }

      setIsOpen(false);
      updateList();
    } catch (error) {
      console.error(
        `Failed to ${action === 'sell' ? 'mark as sold' : 'delete'} business:`,
        error
      );
    }
  };

  const handleCancel = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={handleButton}
        className="flex cursor-pointer items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-red-700"
      >
        Delete
      </button>

      <DeleteModal
        isOpen={isOpen}
        onSell={() => handleAction('sell')}
        onDelete={() => handleAction('delete')}
        onClose={handleCancel}
        title="Sell or Delete Business"
        description={`Do you want to mark "${name}" as sold or permanently delete it?`}
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
