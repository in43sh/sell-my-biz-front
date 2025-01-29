import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBusiness, getBusiness, updateBusiness } from '../api/DBRequests';
import { useAuth } from '../contexts/AuthProvider';

const useBusinessForm = (id) => {
  const navigate = useNavigate();

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
    isListedByOwner: false,
    image: '',
    coverImageUrl: '',
  });

  const [imageSrc, setImageSrc] = useState(null);

  const [error, setError] = useState({});
  const { token } = useAuth();

  const [file, setFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadBusiness = async () => {
    const headers = {
      'Content-Type': 'application/json',
    };
    setIsLoading(true);
    try {
      const business = await getBusiness(headers, id);
      setImageSrc(business.coverImageUrl);
      setForm(business);
    } catch (error) {
      console.error('Failed to fetch business:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadBusiness();
    }
  }, [id]);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
      setForm((prevForm) => ({ ...prevForm, ['coverImageUrl']: '' }));
    }
  };

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

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();

    // Validate form before submitting
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Append the file if it exists
    if (file) {
      formData.append('file', file);
    }

    // Append the form fields (removing empty/null/undefined values)
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });

    try {
      if (id) {
        await updateBusiness(headers, formData, token, id);
      } else {
        const result = await addBusiness({}, formData, token);
        if (result.status === 201) {
          navigate('/account/my-businesses');
        }
      }
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
    imageSrc,
    isLoading,
    setForm,
    setFile,
    setImageSrc,
    handleChange,
    handleSubmit,
    handleFileUpload,
  };
};

export default useBusinessForm;
