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
    };

    if (!(payload instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // --- Transform searchQuery -> name here ---
    // what is name?
    let transformedParams = { ...config.params };
    if (transformedParams?.searchQuery) {
      transformedParams.name = transformedParams.searchQuery;
      delete transformedParams.searchQuery;
    }

    let queryParams = '';
    if (transformedParams) {
      queryParams = new URLSearchParams(transformedParams).toString();
      url = `${url}?${queryParams}`;
    }

    const options = {
      method,
      headers,
      ...(method !== 'GET' && method !== 'DELETE' && payload
        ? {
            body:
              payload instanceof FormData ? payload : JSON.stringify(payload),
          }
        : {}),
    };

    const response = await fetch(`${API_BASE_URL}${url}`, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      if (response.status === 401 && errorResponse?.redirect) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/signin';
        return;
      }

      const errorMessage =
        errorResponse?.msg || errorResponse?.error || UNEXPECTED_ERROR_MESSAGE;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    throw new Error(error.message || UNEXPECTED_ERROR_MESSAGE);
  }
};

// users
export const login = (headers, credentials) =>
  handleApiRequest('/api/v1/login', { headers }, credentials);

export const register = (headers, userData) =>
  handleApiRequest('/api/v1/register', { headers }, userData);

export const updateProfile = (headers, userData, token) => {
  return handleApiRequest(
    '/api/v1/update-profile',
    { headers: headers },
    userData,
    token,
    'PATCH'
  );
};

export const requestPasswordReset = async (email) => {
  return handleApiRequest(
    '/api/v1/forgot-password',
    {
      headers: { 'Content-Type': 'application/json' },
    },
    { email },
    null,
    'POST'
  );
};

export const resetPassword = (headers, passwordData, token) => {
  return handleApiRequest(
    '/api/v1/reset-password',
    { headers },
    passwordData,
    token,
    'PATCH'
  );
};

export const updatePassword = (headers, passwordData, token) => {
  return handleApiRequest(
    '/api/v1/update-password',
    { headers },
    passwordData,
    token,
    'PATCH'
  );
};

export const deleteAccount = async (headers, token) => {
  return handleApiRequest('/api/v1/delete', { headers }, null, token, 'DELETE');
};

// businesses
export const getBusinesses = async (
  sortBy = '',
  filters = {},
  searchQuery = '',
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
    sortBy: sortBy || undefined,
    searchQuery: searchQuery || undefined,
    ...stringFilters,
  };

  const {
    data: { businesses },
  } = await handleApiRequest(
    '/api/v1/businesses',
    { params },
    null,
    null,
    'GET'
  );

  return businesses;
};

export const getUserBusinesses = async (
  sortBy = '',
  filters = {},
  searchQuery = '',
  limit = BUSINESSES_LIMIT,
  skip = 0,
  token
) => {
  const stringFilters = Object.fromEntries(
    Object.entries(filters).map(([key, values]) =>
      Array.isArray(values) ? [key, values.join(',')] : [key, values]
    )
  );

  const params = {
    limit: limit,
    skip: skip,
    sortBy: sortBy || undefined,
    searchQuery: searchQuery || undefined,
    ...stringFilters,
  };

  const {
    data: { businesses },
  } = await handleApiRequest(
    '/api/v1/businesses/my-businesses',
    { params },
    null,
    token,
    'GET'
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
  const businessId = businessData.get('_id');
  console.log('businessData.get(_id); ===> ', businessData.get('_id'));

  return handleApiRequest(
    `/api/v1/businesses/${businessId}`,
    { headers: headers },
    businessData,
    token,
    'PATCH'
  );
};

export const markBusinessAsSold = async (id, token) => {
  await handleApiRequest(
    `/api/v1/businesses/${id}/sell`,
    { headers: {} },
    null,
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
    'DELETE'
  );
};

export const checkApiStatus = async () => {
  try {
    const response = await fetch('http://localhost:8000');
    return response;
  } catch (error) {
    throw new Error('API request failed.');
  }
};
