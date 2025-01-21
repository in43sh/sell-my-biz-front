import { useState } from 'react';

import { addBusiness } from '../api/DBRequests';
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

    if (!form.name) {
      errors.name = 'Business name is required';
    } else if (form.name.length < 2 || form.name.length > 100) {
      errors.name = 'Business name must be between 2 and 100 characters';
    }

    if (!form.description) {
      errors.description = 'Description is required';
    } else if (form.description.length < 10 || form.description.length > 1000) {
      errors.description = 'Description must be between 10 and 1000 characters';
    }

    if (!form.category) {
      errors.category = 'Category is required';
    }

    if (!form.price) {
      errors.price = 'Price is required';
    } else if (form.price < 0) {
      errors.price = 'Price must be a positive number';
    }

    if (!form.grossRevenue) {
      errors.grossRevenue = 'Gross revenue is required';
    } else if (form.grossRevenue < 0) {
      errors.grossRevenue = 'Gross revenue must be a positive number';
    }

    if (!form.profit) {
      errors.profit = 'Profit is required';
    } else if (form.profit < 0) {
      errors.profit = 'Profit must be a positive number';
    }

    if (!form.cashFlow) {
      errors.cashFlow = 'Cash flow is required';
    } else if (form.cashFlow < 0) {
      errors.cashFlow = 'Cash flow must be a positive number';
    }

    if (!form.inventoryValue) {
      errors.inventoryValue = 'Inventory value is required';
    } else if (form.inventoryValue < 0) {
      errors.inventoryValue = 'Inventory value must be a positive number';
    }

    if (!form.address) {
      errors.address = 'Address is required';
    } else if (form.address.length < 5 || form.address.length > 200) {
      errors.address = 'Address must be between 5 and 200 characters';
    }

    if (!form.city) {
      errors.city = 'City is required';
    } else if (form.city.length < 2 || form.city.length > 100) {
      errors.city = 'City must be between 2 and 100 characters';
    }

    if (!form.state) {
      errors.state = 'State is required';
    } else if (form.state.length < 2 || form.state.length > 100) {
      errors.state = 'State must be between 2 and 100 characters';
    }

    if (!form.zipCode) {
      errors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(form.zipCode)) {
      errors.zipCode = 'Invalid ZIP code format';
    }

    if (!form.ownerName) {
      errors.ownerName = 'Owner name is required';
    } else if (form.ownerName.length < 2 || form.ownerName.length > 100) {
      errors.ownerName = 'Owner name must be between 2 and 100 characters';
    }

    if (!form.contactEmail) {
      errors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.contactEmail)) {
      errors.contactEmail = 'Invalid email format';
    }

    if (!form.yearsEstablished) {
      errors.yearsEstablished = 'Years established is required';
    } else if (form.yearsEstablished < 0) {
      errors.yearsEstablished =
        'Years established must be a non-negative number';
    }

    if (!form.employees) {
      errors.employees = 'Number of employees is required';
    } else if (form.employees < 0) {
      errors.employees = 'Number of employees must be a non-negative number';
    }

    if (form.reasonForSelling && form.reasonForSelling.length > 500) {
      errors.reasonForSelling =
        'Reason for selling cannot exceed 500 characters';
    }

    if (form.image && !form.image.startsWith('https://')) {
      errors.image = 'Image URL must start with "https://"';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    console.log('validationErrors ===> ', validationErrors);

    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsLoading(true);

      const headers = { 'Content-Type': 'application/json' };
      const result = await addBusiness(headers, form, token);

      if (result.status === 201) {
        setAccountPage('MyBusinesses');
      }
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        form: error.message,
      }));
    } finally {
      setIsLoading(false);
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
