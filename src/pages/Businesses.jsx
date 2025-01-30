import { useState, useEffect } from 'react';
import { getBusinesses } from '../api/DBRequests';
import emptyFilters from '../constants/emptyFilters';
import usStates from '../constants/usStates';
import categories from '../constants/categories';

const BusinessListPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBusinesses(emptyFilters, '');
  }, []);

  const fetchBusinesses = async (filters, sortBy) => {
    setLoading(true);
    try {
      let adjustedSortBy = '';
      if (sortBy === 'asc' || sortBy === 'desc') {
        adjustedSortBy = sortBy;
      } else if (sortBy === 'newest') {
        adjustedSortBy = 'newest';
      } else if (sortBy === 'oldest') {
        adjustedSortBy = 'oldest';
      }

      const businesses = await getBusinesses(adjustedSortBy, filters);
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

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    fetchBusinesses(filters, newSortBy);
  };

  const handleApplyFilters = () => {
    fetchBusinesses(filters, sortBy);
  };

  const handleResetFilters = () => {
    setFilters(emptyFilters);
    setSortBy('');
    fetchBusinesses(emptyFilters, '');
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
            <button
              className="btn btn-primary btn-block"
              onClick={handleApplyFilters}
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
          <div className="d-flex justify-content-end mb-3">
            <label htmlFor="sortBy" className="align-self-center me-2">
              Sort By:
            </label>
            <select
              id="sortBy"
              name="sortBy"
              className="form-control w-auto"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="">Default</option>
              <option value="asc">Price (Low to High)</option>
              <option value="desc">Price (High to Low)</option>
              <option value="newest">Date Listed (Newest First)</option>
              <option value="oldest">Date Listed (Oldest First)</option>
            </select>
          </div>

          {loading && <p className="d-block mx-auto">Loading...</p>}

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
