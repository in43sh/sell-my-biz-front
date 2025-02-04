import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import ContactModal from './ContactModal';

const BusinessCardSmall = ({
  business,
  canEdit,
  canDelete,
  canViewDetails,
  canContact,
  updateList,
}) => {
  const {
    _id: id,
    name,
    price,
    coverImageUrl,
    ownerName,
    contactEmail,
    phoneNumber,
  } = business;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <img
        className="h-40 w-full object-cover"
        src={coverImageUrl}
        alt={name}
      />
      <div className="p-4 text-center">
        <h6 className="truncate text-lg font-semibold text-gray-800">{name}</h6>
        <p className="font-semibold text-blue-600">${price}</p>
      </div>
      <div className="flex items-center justify-between bg-gray-100 p-3">
        {canContact && (
          <button
            className="text-blue-600 transition hover:text-blue-800"
            onClick={() => setShowModal(true)}
          >
            {/* <i className="fas fa-envelope mr-1"></i> */}
            Contact
          </button>
        )}
        {canViewDetails && (
          <Link
            to={`/business/${id}`}
            className="text-blue-600 transition hover:text-blue-800"
          >
            {/* <i className="fas fa-eye mr-1"></i> */}
            View
          </Link>
        )}
        <div className="flex space-x-2">
          {canEdit && <EditButton id={id} />}
          {canDelete && (
            <DeleteButton id={id} name={name} updateList={updateList} />
          )}
        </div>
      </div>

      {showModal && (
        <ContactModal
          ownerName={ownerName}
          contactEmail={contactEmail}
          phoneNumber={phoneNumber}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default BusinessCardSmall;
