import React, { useState, useEffect } from 'react';
import { getBusinesses } from '../api/DBRequests';
import usStates from '../constants/usStates';
import categories from '../constants/categories';
// import loading from '../assets/images/loading.svg';

const BusinessListPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    state: '',
    minPrice: '',
    maxPrice: '',
    minRevenue: '',
    maxRevenue: '',
  });
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);

  //   const inputFields = [
  //     {
  //       id: 'minPrice',
  //       name: 'minPrice',
  //       type: 'number',
  //       label: 'Min Price',
  //       placeholder: 'Enter minimum price',
  //       value: filters.minPrice,
  //     },
  //     {
  //       id: 'maxPrice',
  //       name: 'maxPrice',
  //       type: 'number',
  //       label: 'Max Price',
  //       placeholder: 'Enter maximum price',
  //       value: filters.maxPrice,
  //     },
  //     {
  //       id: 'minRevenue',
  //       name: 'minRevenue',
  //       type: 'number',
  //       label: 'Min Revenue',
  //       placeholder: 'Enter minimum revenue',
  //       value: filters.minRevenue,
  //     },
  //     {
  //       id: 'maxRevenue',
  //       name: 'maxRevenue',
  //       type: 'number',
  //       label: 'Max Revenue',
  //       placeholder: 'Enter maximum revenue',
  //       value: filters.maxRevenue,
  //     },
  //   ];

  // Fetch businesses when filters or sorting change
  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    setLoading(true);
    try {
      const adjustedSortBy =
        sortBy === 'asc' ? 'asc' : sortBy === 'desc' ? 'desc' : '';
      // console.log('adjustedSortBy ===> ', adjustedSortBy);

      const businesses = await getBusinesses(adjustedSortBy, filters);
      // console.log('businesses ===> ', businesses);

      setBusinesses(businesses);
    } catch (error) {
      console.error('Error fetching businesses:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: '',
      state: '',
      minPrice: '',
      maxPrice: '',
      minRevenue: '',
      maxRevenue: '',
    });
    setSortBy('');
    fetchBusinesses();
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Filters Section */}
        <div className="col-md-3">
          <div className="bg-light border p-3">
            <h5>Filters</h5>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={filters.category}
                onChange={handleInputChange}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                id="state"
                name="state"
                className="form-control"
                value={filters.state}
                onChange={handleInputChange}
              >
                {usStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="minPrice" className="form-label">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                className="form-control"
                value={filters.minPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="maxPrice" className="form-label">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                className="form-control"
                value={filters.maxPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="minRevenue" className="form-label">
                Min Revenue
              </label>
              <input
                type="number"
                id="minRevenue"
                name="minRevenue"
                className="form-control"
                value={filters.minRevenue}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="maxRevenue" className="form-label">
                Max Revenue
              </label>
              <input
                type="number"
                id="maxRevenue"
                name="maxRevenue"
                className="form-control"
                value={filters.maxRevenue}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sortBy" className="form-label">
                Sort By
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="form-control"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Default</option>
                <option value="asc">Price (Low to High)</option>
                <option value="desc">Price (High to Low)</option>
              </select>
            </div>
            <button
              className="btn btn-primary btn-block"
              onClick={fetchBusinesses}
            >
              Apply Filters
            </button>
            <button
              className="btn btn-secondary btn-block mt-2"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Businesses List Section */}
        <div className="col-md-9">
          {loading && (
            // <img src={loading} alt="Loading" className="d-block mx-auto" />
            <p className="d-block mx-auto">Loading</p>
          )}
          <div className="row">
            {businesses.length === 0 && !loading && (
              <div className="col-12">
                <p className="mt-4 text-center">No businesses found.</p>
              </div>
            )}
            {businesses.map((business) => (
              <div className="col-md-4 mb-4" key={business._id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{business.name}</h5>
                    <p className="card-text">{business.description}</p>
                    <p className="card-text">
                      <strong>Category:</strong> {business.category}
                    </p>
                    <p className="card-text">
                      <strong>State:</strong> {business.state}
                    </p>
                    <p className="card-text">
                      <strong>Price:</strong> ${business.price.toLocaleString()}
                    </p>
                    <p className="card-text">
                      <strong>Gross Revenue:</strong> $
                      {business.grossRevenue.toLocaleString()}
                    </p>
                    <p className="card-text">
                      <strong>Date Listed:</strong>{' '}
                      {new Date(business.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="card-footer">
                    <a
                      href={`/business/${business._id}`}
                      className="btn btn-primary btn-sm btn-block"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessListPage;
