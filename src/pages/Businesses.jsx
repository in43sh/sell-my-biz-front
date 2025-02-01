import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBusinesses } from '../api/DBRequests';
import { useAuth } from '../contexts/AuthProvider';
import BusinessesList from '../components/Businesses/BusinessesList';
import InputField from '../components/Form/InputField';
import Search from '../components/Search';

import emptyFilters from '../constants/emptyFilters';
import usStates from '../constants/usStates';
import categories from '../constants/categories';
import sortOptions from '../constants/sortOptions';

const BusinessListPage = () => {
  // 1) Get query params
  const [searchParams] = useSearchParams();
  // If /businesses?category=Automotive => categoryParam === 'Automotive'
  const categoryParam = searchParams.get('category') || '';
  // If /businesses?query=someSearch => searchQueryParam === 'someSearch'
  const searchQueryParam = searchParams.get('query') || '';

  const { isLoggedIn } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [filters, setFilters] = useState({
    ...emptyFilters,
    category: categoryParam || '', // we can override it from the URL param
  });
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);

  // Whenever 'categoryParam' or 'searchQueryFromParams' changes, re-fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Here we only pass (sortBy, filters, searchQuery) or similar
        const data = await getBusinesses(sortBy, filters, '');
        setBusinesses(data);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy, filters]);

  // Sorting, filters, etc.
  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    fetchBusinesses(filters, newSortBy, searchQueryFromParams, categoryParam);
  };

  const handleApplyFilters = () => {
    fetchBusinesses(filters, sortBy, searchQueryFromParams, categoryParam);
  };

  const handleResetFilters = () => {
    setFilters(emptyFilters);
    setSortBy('');
    fetchBusinesses(emptyFilters, '', searchQueryFromParams, categoryParam);
  };

  // Render
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-3">
          <div className="bg-light border p-3">
            <h5>Filters</h5>
            {/* -- Category Filter -- */}
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* -- Other filters (State, price, etc.) -- */}
            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                id="state"
                name="state"
                className="form-control"
                value={filters.state}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, state: e.target.value }))
                }
              >
                {usStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Price/Revenue filters */}
            <InputField
              id="minPrice"
              name="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
              }
              label="Min Price"
            />
            <InputField
              id="maxPrice"
              name="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
              }
              label="Max Price"
            />
            <InputField
              id="minRevenue"
              name="minRevenue"
              type="number"
              value={filters.minRevenue}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minRevenue: e.target.value }))
              }
              label="Min Revenue"
            />
            <InputField
              id="maxRevenue"
              name="maxRevenue"
              type="number"
              value={filters.maxRevenue}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxRevenue: e.target.value }))
              }
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
