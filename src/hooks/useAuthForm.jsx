import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { login } from '../api/DBRequests';
import { useAuth } from '../contexts/AuthProvider';

const useAuthForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState({});
  const { setUserSession } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!form.email) errors.email = 'Email is required';
    if (!form.password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    console.log('here');

    e.preventDefault();

    const validationErrors = validateForm();
    setError(validationErrors);
    console.log('here2');
    if (Object.keys(validationErrors).length > 0) {
      console.log('validationErrors ===> ', validationErrors);
      return;
    }

    setIsLoading(true);

    console.log('here3');
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const result = await login(headers, form);
      console.log('result ===> ', result);

      if (result.status === 200) {
        setUserSession({
          user: result.data.user,
          token: result.data.token,
        });
        navigate('/');
      }
    } catch (error) {
      setError((prevError) => ({
        ...prevError,
        form: error.message,
      }));
    }

    setIsLoading(false);
  };

  return { form, error, isLoading, handleChange, handleSubmit };
};

export default useAuthForm;
