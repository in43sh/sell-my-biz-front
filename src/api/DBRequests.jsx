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
  // console.log('url ===> ', url);
  // console.log('config.params ===> ', config.params);

  try {
    const headers = {
      ...config.headers,
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Serialize config.params into query parameters
    let queryParams = '';
    if (config.params) {
      queryParams = new URLSearchParams(config.params).toString();
      url = `${url}?${queryParams}`;
    }

    const options = {
      method,
      headers,
      ...(method !== 'GET' && method !== 'DELETE' && payload
        ? { body: JSON.stringify(payload) }
        : {}),
    };

    // console.log('url ===> ', url);
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

// businesses
export const getBusinesses = async (
  sortBy = '',
  filters = {},
  limit = BUSINESSES_LIMIT,
  skip = 0
) => {
  // console.log('sortBy ===> ', sortBy);
  // console.log('filters ===> ', filters);
  const stringFilters = Object.fromEntries(
    Object.entries(filters).map(([key, values]) =>
      Array.isArray(values) ? [key, values.join(',')] : [key, values]
    )
  );

  const params = {
    limit: limit,
    skip: skip,
    priceSort: sortBy || undefined,
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

  return businesses;
};

export const getBusiness = async (headers, id) => {
  const {
    data: { business },
  } = await handleApiRequest(
    `/api/v1/businesses/${id}`,
    headers,
    null,
    null,
    'GET'
  );

  return business;
};

export const addBusiness = (headers, businessData, token) => {
  return handleApiRequest(
    '/api/v1/businesses',
    { headers: headers },
    businessData,
    token
  );
};
export const updateBusiness = (headers, businessData, token) => {
  return handleApiRequest(
    `/api/v1/businesses/${businessData._id}`,
    { headers: headers },
    businessData,
    token,
    'PATCH'
  );
};
export const deleteBusiness = async (id, token) => {
  await handleApiRequest(
    `/api/v1/businesses/${id}`,
    { headers: {} },
    null,
    token,
    'delete'
  );
};
