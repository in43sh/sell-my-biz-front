// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const BusinessCard = ({
  business,
  canEdit,
  canDelete,
  canViewDetails,
  canContact,
  updateList,
  isLink = false,
}) => {
  const { _id: id, name, description, price, image } = business;
  return (
    <div key={business.id} className="col-lg-3 col-md-6 col-sm-12 pb-1">
      <div className="card product-item mb-4 border-0">
        <div className="card-header product-img position-relative overflow-hidden border bg-transparent p-0">
          <img
            className="img-fluid w-100"
            src="img/product-1.jpg"
            alt={business.name}
          />
        </div>
        <div className="card-body border-left border-right p-0 pt-4 pb-3 text-center">
          <h6 className="text-truncate mb-3">{business.name}</h6>
          <div className="d-flex justify-content-center">
            <h6>$123.00</h6>
            {/* <h6 className="text-muted ml-2">
              <del>$123.00</del>
            </h6> */}
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border">
          {canViewDetails && (
            <a href="/" className="btn btn-sm text-dark p-0">
              <i className="fas fa-shopping-cart text-primary mr-1"></i>Contact
            </a>
          )}
          {canContact && (
            <a href="/" className="btn btn-sm text-dark p-0">
              <i className="fas fa-eye text-primary mr-1"></i>View Detail
            </a>
          )}
          {isLink ? (
            <Link to={`/businesses/${id}`} className="btn btn-sm text-dark p-0">
              <i className="fas fa-eye text-primary mr-1"></i>View Details
            </Link>
          ) : null}
          <div className="d-flex">
            {canEdit && <EditButton id={id} />}
            {canDelete && (
              <DeleteButton id={id} name={name} updateList={updateList} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
