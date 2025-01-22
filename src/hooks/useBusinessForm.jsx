import { useState, useEffect } from 'react';
import { addBusiness, getBusiness } from '../api/DBRequests';
import { useAccount } from '../contexts/AccountProvider';
import { useAuth } from '../contexts/AuthProvider';

const useBusinessForm = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    grossRevenue: '',
    profit: '',
    cashFlow: '',
    inventoryValue: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    ownerName: '',
    contactEmail: '',
    yearsEstablished: '',
    employees: '',
    reasonForSelling: '',
    image: '',
  });

  const [error, setError] = useState({});
  const { token } = useAuth();
  const { setAccountPage } = useAccount();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load data for editing
  useEffect(() => {
    const fetchBusiness = async () => {
      if (id) {
        try {
          const business = await getBusiness(id); // Assume an API call to fetch a business by ID
          setForm(business);
        } catch (error) {
          console.error('Failed to fetch business:', error);
        }
      }
    };
    fetchBusiness();
  }, [id]);

  const handleChange = ({ target: { name, value } }) => {
    setError((prevError) => {
      const newError = { ...prevError };
      delete newError[name];
      return newError;
    });
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    // Validation logic remains the same as your implementation
    // ...
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const headers = { 'Content-Type': 'application/json' };
      console.log('form ===> ', form);
      console.log('here');

      await addBusiness(headers, form, token);
      // fetchBusinesses(); // Refresh the list of businesses
    } catch (error) {
      console.error(error);
      setError({ form: 'Failed to add business.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    error,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useBusinessForm;
