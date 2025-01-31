import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { getBusiness } from '../api/DBRequests';

const BusinessDetail = () => {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);

  const getBusinessData = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const businessData = await getBusiness(headers, id);
      setBusiness(businessData);
    } catch (error) {
      console.error('Error fetching business data:', error);
    }
  };

  const handleContactSeller = () => {
    if (isLoggedIn) {
      setShowContactInfo(true);
    } else {
      setRedirectToSignIn(true);
    }
  };

  useEffect(() => {
    getBusinessData();
  }, [id]);

  // Declaratively redirect if needed
  if (redirectToSignIn) {
    return (
      <Navigate
        to="/sign-in"
        state={{ from: window.location.pathname }}
        replace
      />
    );
  }

  if (!business) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  return (
    <div>
      <div className="container py-5">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div className="mb-5">
              <h3 className="font-weight-semi-bold">{business.name}</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Category:</strong> {business.category}
                </li>
                <li className="list-group-item">
                  <strong>Price:</strong> ${business.price}
                </li>
                <li className="list-group-item">
                  <strong>Revenue:</strong> ${business.grossRevenue}
                </li>
                <li className="list-group-item">
                  <strong>Profit:</strong> ${business.profit}
                </li>
                <li className="list-group-item">
                  <strong>Cash Flow:</strong> ${business.cashFlow}
                </li>
                <li className="list-group-item">
                  <strong>Inventory Value:</strong> ${business.inventoryValue}
                </li>
                <li className="list-group-item">
                  <strong>Address:</strong> {business.address}
                </li>
                <li className="list-group-item">
                  <strong>City:</strong> {business.city}
                </li>
                <li className="list-group-item">
                  <strong>State:</strong> {business.state}
                </li>
                <li className="list-group-item">
                  <strong>ZipCode:</strong> {business.zipCode}
                </li>
                <li className="list-group-item">
                  <strong>Owner Name:</strong> {business.ownerName}
                </li>
                {/* Display listing source if posted by owner */}
                {business.isListedByOwner && (
                  <li className="list-group-item">
                    <i className="fa fa-check-circle text-success me-2"></i>
                    Posted by Owner
                  </li>
                )}
                <li className="list-group-item">
                  <strong>Contact Email:</strong> {business.contactEmail}
                </li>
                <li className="list-group-item">
                  <strong>Years Established:</strong>{' '}
                  {business.yearsEstablished}
                </li>
                <li className="list-group-item">
                  <strong>Employees:</strong> {business.employees}
                </li>
                <li className="list-group-item">
                  <strong>Reason for Selling:</strong>{' '}
                  {business.reasonForSelling}
                </li>
              </ul>
            </div>
            <h4 className="font-weight-semi-bold mb-3">Description</h4>
            <p>{business.description}</p>
          </div>

          <div className="col-lg-4">
            <div className="card mb-4 border-0">
              <div className="card-body text-center">
                <p>
                  If you're interested in this business, please get in touch
                  with the seller for more information.
                </p>
                <button
                  onClick={handleContactSeller}
                  className="btn btn-primary"
                >
                  Contact Seller
                </button>
              </div>
            </div>
            {showContactInfo && (
              <div className="card mb-4">
                <div className="card-body">
                  <h5>Contact Information</h5>
                  <p>
                    <i className="fa fa-user text-primary me-2"></i>
                    {business.ownerName}
                  </p>
                  <p>
                    <i className="fa fa-envelope text-primary me-2"></i>
                    {business.contactEmail}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
