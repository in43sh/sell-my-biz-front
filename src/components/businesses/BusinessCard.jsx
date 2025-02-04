import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from '../businesses/DeleteButton';
import ContactModal from './ContactModal';
import EditButton from '../businesses/EditButton';
import defaultCoverImage from '../../assets/images/default-cover.jpg';

const BusinessCard = ({
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
    category,
    description,
    coverImageUrl,
    ownerName,
    contactEmail,
    phoneNumber,
    isListedByOwner,
    grossRevenue,
    createdAt,
    state,
  } = business;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      <div className="relative w-full">
        <img
          src={coverImageUrl || defaultCoverImage}
          alt={name}
          className="h-48 w-full object-cover"
        />
        {isListedByOwner && (
          <span className="absolute top-2 left-2 rounded-md bg-green-500 px-2 py-1 text-xs font-bold text-white">
            Owner Listed
          </span>
        )}
      </div>

      <div className="flex flex-col p-4">
        <h5 className="text-xl font-bold text-gray-900">{name}</h5>
        <p className="text-sm text-gray-500">
          {state} | {category}
        </p>
        <p className="mt-2 line-clamp-3 text-sm text-gray-700">{description}</p>

        <div className="mt-4">
          <h6 className="text-lg font-bold text-blue-600">
            ${price.toLocaleString()}
          </h6>
          <p className="text-sm text-gray-600">
            <strong>Gross Revenue:</strong> ${grossRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Listed On:</strong>{' '}
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {canViewDetails && (
            <Link
              to={`/business/${id}`}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              View Details
            </Link>
          )}

          {canContact && (
            <button
              onClick={() => setShowModal(true)}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
            >
              Contact Seller
            </button>
          )}

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

export default BusinessCard;
