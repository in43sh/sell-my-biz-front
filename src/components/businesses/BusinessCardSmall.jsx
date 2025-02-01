// import PropTypes from 'prop-types';
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
  // isLink = false,
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
    <div key={business.id} className="col-lg-3 col-md-6 col-sm-12 pb-1">
      <div className="card product-item mb-4 border-0">
        <div className="card-header product-img position-relative overflow-hidden border bg-transparent p-0">
          <img className="img-fluid w-100" src={coverImageUrl} alt={name} />
        </div>
        <div className="card-body border-left border-right p-0 pt-4 pb-3 text-center">
          <h6 className="text-truncate mb-3">{name}</h6>
          <div className="d-flex justify-content-center">
            <h6>${price}</h6>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border">
          {canContact && (
            <button
              className="btn btn-sm text-dark p-0"
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-shopping-cart text-primary mr-1"></i>Contact
            </button>
          )}
          {canViewDetails && (
            <Link to={`/business/${id}`} className="btn btn-sm text-dark p-0">
              <i className="fas fa-eye text-primary mr-1"></i>View Detail
            </Link>
          )}
          <div className="d-flex">
            {canEdit && <EditButton id={id} />}
            {canDelete && (
              <DeleteButton id={id} name={name} updateList={updateList} />
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal Component */}
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
