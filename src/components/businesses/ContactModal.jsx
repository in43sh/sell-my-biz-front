import { XMarkIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import { formatPhoneNumber } from '../../utils/phoneFormatter';

const ContactModal = ({
  ownerName,
  contactEmail,
  phoneNumber,
  preferredContactMethod,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target.id === 'modal-overlay' && onClose()}
    >
      <div
        id="modal-overlay"
        className="flex h-full w-full items-center justify-center"
      >
        <div
          className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3">
            <h5 className="text-lg font-semibold text-gray-800">
              Contact Information
            </h5>
            <button
              type="button"
              className="rounded-full p-1 text-gray-500 transition hover:bg-gray-200"
              onClick={onClose}
            >
              <XMarkIcon className="h-5 w-5 cursor-pointer" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-3 py-4 text-gray-700">
            <p>
              <strong>Name:</strong> {ownerName || 'N/A'}
            </p>

            {/* Show contact method based on preferredContactMethod */}
            {preferredContactMethod === 'email' && contactEmail ? (
              <p>
                <strong>Email:</strong>{' '}
                <a
                  className="text-blue-600 hover:underline"
                  href={`mailto:${contactEmail}`}
                >
                  {contactEmail}
                </a>
              </p>
            ) : preferredContactMethod === 'phone' && phoneNumber ? (
              <p>
                <strong>Phone:</strong>{' '}
                <a
                  className="text-blue-600 hover:underline"
                  href={`tel:${phoneNumber}`}
                >
                  {formatPhoneNumber(phoneNumber)}
                </a>
              </p>
            ) : (
              <>
                {/* If no preferred method, show both if available */}
                {contactEmail && (
                  <p>
                    <strong>Email:</strong>{' '}
                    <a
                      className="text-blue-600 hover:underline"
                      href={`mailto:${contactEmail}`}
                    >
                      {contactEmail}
                    </a>
                  </p>
                )}
                {phoneNumber && (
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a
                      className="text-blue-600 hover:underline"
                      href={`tel:${phoneNumber}`}
                    >
                      {formatPhoneNumber(phoneNumber)}
                    </a>
                  </p>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t pt-3">
            <button
              type="button"
              className="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300 focus:ring focus:ring-gray-400"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactModal.propTypes = {
  ownerName: PropTypes.string,
  contactEmail: PropTypes.string,
  phoneNumber: PropTypes.string,
  preferredContactMethod: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ContactModal;
