import PropTypes from 'prop-types';

const Modal = ({ isOpen, onSell, onDelete, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between border-b pb-3">
          <h5 className="text-lg font-semibold">{title}</h5>
          <button
            type="button"
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="py-4">
          <p className="text-gray-700">{description}</p>
        </div>
        <div className="flex justify-end space-x-3 border-t pt-3">
          <button
            className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 font-medium text-gray-800 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="cursor-pointer rounded-md bg-yellow-500 px-4 py-2 font-medium text-white hover:bg-yellow-600"
            onClick={onSell}
          >
            Mark as Sold
          </button>
          <button
            className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
            onClick={onDelete}
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSell: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Modal;
