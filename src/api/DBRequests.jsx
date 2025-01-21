const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UNEXPECTED_ERROR_MESSAGE = 'An unexpected error occurred';
const BUSINESSES_LIMIT = 20;

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

    console.log('headers ===> ', headers);

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    console.log('token ===> ', token);

    // const options = {
    //   method,
    //   headers,
    //   body:
    //     method !== 'GET' && method !== 'DELETE'
    //       ? JSON.stringify(payload)
    //       : undefined,
    // };
    const options = {
      method,
      headers,
      ...(method !== 'GET' && method !== 'DELETE' && payload
        ? { body: JSON.stringify(payload) }
        : {}),
    };

    console.log('options ===> ', options);
    // console.log('API_BASE_URL ===> ', API_BASE_URL);
    // console.log('url ===> ', url);

    const response = await fetch(`${API_BASE_URL}${url}`, options);
    await fetch(`${API_BASE_URL}${url}`, options);
    console.log('response ===> ', response);

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage =
        errorResponse?.msg || errorResponse?.error || UNEXPECTED_ERROR_MESSAGE;
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    // console.log('data ===> ', data);
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

// businesses
export const getBusinesses = async (
  sortBy = '',
  filters = {},
  limit = BUSINESSES_LIMIT,
  skip = 0
) => {
  const stringFilters = Object.fromEntries(
    Object.entries(filters).map(([key, values]) =>
      Array.isArray(values) ? [key, values.join(',')] : [key, values]
    )
  );

  const params = {
    limit: limit,
    skip: skip,
    sort: sortBy || undefined,
    ...stringFilters,
  };

  const {
    data: { businesses },
  } = await handleApiRequest(
    '/api/v1/businesses',
    { params },
    null,
    null,
    'get'
  );

  // console.log('data ===> ', data);
  console.log('businesses ===> ', businesses);

  return businesses;
};

export const addBusiness = (headers, bookData, token) => {
  return handleApiRequest(
    '/api/v1/businesses',
    { headers: headers },
    bookData,
    token
  );
};
