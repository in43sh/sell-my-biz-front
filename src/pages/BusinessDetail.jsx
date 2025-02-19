import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { getBusiness } from '../api/DBRequests';
import Spinner from '../components/common/Spinner';
import ContactModal from '../components/businesses/ContactModal';
import { formatCurrency } from '../utils/formatCurrency';

const BusinessDetail = () => {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const data = await getBusiness(
          { 'Content-Type': 'application/json' },
          id
        );
        setBusiness(data);
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };
    fetchBusiness();
  }, [id]);

  if (redirectToSignIn) {
    return (
      <Navigate
        to="/signin"
        state={{ from: window.location.pathname }}
        replace
      />
    );
  }

  if (!business) return <Spinner />;

  const handleContactSeller = () => {
    isLoggedIn ? setShowContactInfo(true) : setRedirectToSignIn(true);
  };

  const {
    name,
    category,
    price,
    grossRevenue,
    profit,
    cashFlow,
    inventoryValue,
    yearEstablished,
    employees,
    reasonForSelling,
    address,
    city,
    state,
    zipCode,
    description,
    coverImageUrl,
    isListedByOwner,
    ownerName,
    contactEmail,
    phoneNumber,
    preferredContactMethod,
  } = business;

  const formattedAddress = [address, city, state, zipCode]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="w-full px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Business Image */}
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
          <img
            src={coverImageUrl || 'https://via.placeholder.com/800x400'}
            alt={name}
            className="h-full w-full object-cover"
          />
          {isListedByOwner && (
            <div className="absolute top-4 left-4 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">
              Posted by Owner
            </div>
          )}
        </div>

        {/* Business Details */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold">{name}</h3>
            <p className="mt-2 text-gray-600">{category}</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: 'Price', value: formatCurrency(price) },
                { label: 'Revenue', value: formatCurrency(grossRevenue) },
                { label: 'Profit', value: formatCurrency(profit) },
                { label: 'Cash Flow', value: formatCurrency(cashFlow) },
                {
                  label: 'Inventory Value',
                  value: formatCurrency(inventoryValue),
                },
                { label: 'Year Established', value: yearEstablished },
                {
                  label: 'Employees',
                  value:
                    employees !== null && employees !== undefined
                      ? employees
                      : 'N/A',
                },
                { label: 'Reason for Selling', value: reasonForSelling },
              ].map(
                ({ label, value }) =>
                  value !== null &&
                  value !== undefined && (
                    <div key={label}>
                      <strong>{label}:</strong> {value}
                    </div>
                  )
              )}
            </div>
            {formattedAddress && (
              <div className="mt-6">
                <strong>Address:</strong> {formattedAddress}
              </div>
            )}
            <h4 className="mt-6 text-2xl font-bold">Description</h4>
            <p className="mt-2 text-gray-700">{description}</p>
          </div>

          {/* Contact Seller */}
          <div className="rounded-lg bg-gray-50 p-6 shadow">
            <p className="text-center text-gray-600">
              Interested? Contact the seller for more details.
            </p>
            <button
              onClick={handleContactSeller}
              className="mt-4 w-full cursor-pointer rounded-md bg-blue-600 py-2 font-semibold text-white transition duration-300 hover:bg-blue-700"
            >
              Contact Seller
            </button>
            {showContactInfo && (
              <ContactModal
                ownerName={ownerName}
                contactEmail={contactEmail}
                phoneNumber={phoneNumber}
                preferredContactMethod={preferredContactMethod}
                onClose={() => setShowContactInfo(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
