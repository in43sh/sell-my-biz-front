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
      const businessData = await getBusiness(
        { 'Content-Type': 'application/json' },
        id
      );
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
    return <div className="w-full py-10 text-center">Loading...</div>;
  }

  return (
    <div className="w-full px-4 py-10">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="text-3xl font-semibold">{business.name}</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <strong>Category:</strong> {business.category}
            </li>
            <li>
              <strong>Price:</strong> ${business.price}
            </li>
            <li>
              <strong>Revenue:</strong> ${business.grossRevenue}
            </li>
            <li>
              <strong>Profit:</strong> ${business.profit}
            </li>
            <li>
              <strong>Cash Flow:</strong> ${business.cashFlow}
            </li>
            <li>
              <strong>Inventory Value:</strong> ${business.inventoryValue}
            </li>
            <li>
              <strong>Address:</strong> {business.address}
            </li>
            <li>
              <strong>City:</strong> {business.city}
            </li>
            <li>
              <strong>State:</strong> {business.state}
            </li>
            <li>
              <strong>ZipCode:</strong> {business.zipCode}
            </li>
            <li>
              <strong>Owner Name:</strong> {business.ownerName}
            </li>
            {business.isListedByOwner && (
              <li className="font-semibold text-green-600">Posted by Owner</li>
            )}
            <li>
              <strong>Contact Email:</strong> {business.contactEmail}
            </li>
            <li>
              <strong>Years Established:</strong> {business.yearsEstablished}
            </li>
            <li>
              <strong>Employees:</strong> {business.employees}
            </li>
            <li>
              <strong>Reason for Selling:</strong> {business.reasonForSelling}
            </li>
          </ul>
          <h4 className="mt-6 text-2xl font-semibold">Description</h4>
          <p className="mt-2">{business.description}</p>
        </div>

        <div className="rounded-lg bg-gray-100 p-6 shadow lg:col-span-1">
          <p className="text-center">
            If you're interested, contact the seller for more details.
          </p>
          <button
            onClick={handleContactSeller}
            className="mt-4 w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition duration-300 hover:bg-blue-700"
          >
            Contact Seller
          </button>

          {showContactInfo && (
            <div className="mt-4 rounded-lg bg-white p-4 shadow">
              <h5 className="text-lg font-semibold">Contact Information</h5>
              <p className="mt-2">
                <strong>Owner:</strong> {business.ownerName}
              </p>
              <p>
                <strong>Email:</strong> {business.contactEmail}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
