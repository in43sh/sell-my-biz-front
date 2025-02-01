import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBusinesses } from '../api/DBRequests';
import { useAuth } from '../contexts/AuthProvider';
import BusinessesList from '../components/Businesses/BusinessesList';
import InputField from '../components/Form/InputField';
import Search from '../components/Search';
// import BusinessCard from '../components/Businesses/BusinessCard';
import emptyFilters from '../constants/emptyFilters';
import usStates from '../constants/usStates';
import categories from '../constants/categories';
import sortOptions from '../constants/sortOptions';

const BusinessListPage = () => {
  const { isLoggedIn } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const searchQueryFromParams = searchParams.get('query') || '';
  console.log('searchQueryFromParams ===> ', searchQueryFromParams);

  useEffect(() => {
    console.log('businesses ===> ', businesses);
  }, [businesses]);

  // useEffect(() => {
  //   fetchBusinesses(emptyFilters, '');
  // }, []);
  useEffect(() => {
    // 2) Whenever the query param changes, refetch the businesses.
    //    You could incorporate it into your filters or pass it separately:
    fetchBusinesses(emptyFilters, sortBy, searchQueryFromParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQueryFromParams]);

  const fetchBusinesses = async (filters, sortBy, searchQuery) => {
    setLoading(true);
    try {
      // const businesses = await getBusinesses(sortBy, filters);
      const businesses = await getBusinesses(sortBy, filters, searchQuery);
      console.log('sortBy ===> ', sortBy);
      console.log('filters ===> ', filters);
      console.log('searchQuery ===> ', searchQuery);

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
    fetchBusinesses(filters, newSortBy, searchQueryFromParams);
  };

  const handleApplyFilters = () => {
    fetchBusinesses(filters, sortBy, searchQueryFromParams);
  };

  const handleResetFilters = () => {
    setFilters(emptyFilters);
    setSortBy('');
    fetchBusinesses(emptyFilters, '', searchQueryFromParams);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
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
            <InputField
              id="minPrice"
              name="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={handleInputChange}
              label="Min Price"
            />
            <InputField
              id="maxPrice"
              name="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={handleInputChange}
              label="Max Price"
            />
            <InputField
              id="minRevenue"
              name="minRevenue"
              type="number"
              value={filters.minRevenue}
              onChange={handleInputChange}
              label="Min Revenue"
            />
            <InputField
              id="maxRevenue"
              name="maxRevenue"
              type="number"
              value={filters.maxRevenue}
              onChange={handleInputChange}
              label="Max Revenue"
            />
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

        <div className="col-md-9">
          {/* Row for Search + Sort */}
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            {/* Search bar (left side) */}
            <div className="mb-md-0 me-2 mb-2 flex-grow-1">
              <Search />
            </div>

            {/* Sort dropdown (right side) */}
            <div className="d-flex align-items-center">
              <label htmlFor="sortBy" className="me-2 mb-0">
                Sort By:
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="form-select w-auto"
                value={sortBy}
                onChange={handleSortChange}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading && <p className="d-block mx-auto">Loading...</p>}

          <div className="row">
            {businesses.length === 0 && !loading && (
              <div className="col-12">
                <p className="mt-4 text-center">No businesses found.</p>
              </div>
            )}

            <BusinessesList
              list={businesses}
              canViewDetails={true}
              canContact={isLoggedIn ? true : false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessListPage;
