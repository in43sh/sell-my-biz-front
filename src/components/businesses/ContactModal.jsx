import { formatPhoneNumber } from '../../utils/phoneFormatter';

const ContactModal = ({ ownerName, contactEmail, phoneNumber, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div
      className="bg-opacity-50 modal-overlay fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-3">
          <h5 className="text-lg font-semibold">Contact Information</h5>
          <button
            type="button"
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="py-4">
          <p>
            <strong>Name:</strong> {ownerName || 'N/A'}
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a
              className="text-blue-700"
              href={`mailto:${contactEmail}` || 'N/A'}
            >
              {contactEmail}
            </a>
          </p>
          <p className="mt-2">
            <strong>Phone:</strong>{' '}
            <a href={`tel:${phoneNumber}`}>{formatPhoneNumber(phoneNumber)}</a>
          </p>
        </div>
        <div className="flex justify-end border-t pt-3">
          <button
            type="button"
            className="cursor-pointer rounded-md bg-gray-300 px-4 py-2 font-medium text-gray-800 hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
