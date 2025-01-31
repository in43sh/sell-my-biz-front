import { useState } from 'react';
import defaultCoverImage from '../../assets/images/default-cover.jpg';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import ContactModal from './ContactModal';

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
  } = business;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mt-4">
      <div className="card mb-3 shadow-sm" style={{ maxWidth: '800px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={coverImageUrl || defaultCoverImage}
              className="img-fluid rounded-start"
              alt={business.name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="text-muted mb-1">
                {business.state}, {category}
              </p>
              <p className="card-text">{description}</p>

              <h6 className="fw-bold">${price.toLocaleString()}</h6>
              <p>
                <strong>Gross Revenue:</strong> $
                {business.grossRevenue.toLocaleString()}
              </p>
              <p>
                <strong>Date Listed:</strong>{' '}
                {new Date(business.createdAt).toLocaleDateString()}
              </p>

              {/* <a
                href={`/business/${business._id}`}
                className="btn btn-primary me-2"
              >
                View Details
              </a> */}

              {canViewDetails && (
                <Link
                  to={`/business/${id}`}
                  className="btn btn-primary text-dark mr-1"
                >
                  <i className="fas fa-eye text-primary"></i>View Detail
                </Link>
              )}
              {/* <a href="#" className="btn btn-primary">
                Contact
              </a> */}
              {canContact && (
                <button
                  className="btn btn-primary text-dark mr-1"
                  onClick={() => setShowModal(true)}
                >
                  <i className="fas fa-shopping-cart text-primary mr-1"></i>
                  Contact
                </button>
              )}

              <div className="d-flex">
                {canEdit && <EditButton id={id} />}
                {canDelete && (
                  <DeleteButton id={id} name={name} updateList={updateList} />
                )}
              </div>
            </div>
          </div>
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
