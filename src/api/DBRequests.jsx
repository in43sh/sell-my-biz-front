const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';

const handleApiRequest = async (
  url,
  config = {},
  payload,
  token = '',
  method = 'POST'
) => {
  try {
    const headers = {
      ...config.headers,
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
      body:
        method !== 'GET' && method !== 'DELETE'
          ? JSON.stringify(payload)
          : undefined,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.msg || errorResponse?.error || UNEXPECTED_ERROR_MESSAGE;
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      error?.response?.data?.error ||
      UNEXPECTED_ERROR_MESSAGE;

    const customError = new Error(errorMessage);
    customError.status = error?.response?.status;
    throw customError;
  }
};

// auth
export const login = (headers, credentials) =>
  handleApiRequest('/api/v1/login', { headers }, credentials);

export const register = (headers, userData) =>
  handleApiRequest('/api/v1/register', { headers }, userData);
