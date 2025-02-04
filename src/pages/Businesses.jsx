import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBusinesses } from '../api/DBRequests';
import { useAuth } from '../contexts/AuthProvider';
import BusinessesList from '../components/businesses/BusinessesList';
import InputField from '../components/Form/InputField';
import Search from '../components/Search';

import emptyFilters from '../constants/emptyFilters';
import usStates from '../constants/usStates';
import categories from '../constants/categories';
import sortOptions from '../constants/sortOptions';

const BusinessListPage = () => {
  const [searchParams] = useSearchParams();
  const searchQueryFromParams = searchParams.get('query') || '';
  const categoryParam = searchParams.get('category') || '';
  const searchQueryParam = searchParams.get('query') || '';

  const { isLoggedIn } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [filters, setFilters] = useState({
    ...emptyFilters,
    category: categoryParam || '',
  });
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    fetchBusinesses(filters, newSortBy, searchQueryParam, categoryParam);
  };
  const handleApplyFilters = () => {
    fetchBusinesses(filters, sortBy, searchQueryParam, categoryParam);
  };
  const handleResetFilters = () => {
    setFilters(emptyFilters);
    setSortBy('');
    fetchBusinesses(emptyFilters, '', searchQueryParam, categoryParam);
  };

  useEffect(() => {
    fetchBusinesses(emptyFilters, sortBy, searchQueryFromParams);
  }, [searchQueryFromParams]);

  const fetchBusinesses = async (filters, sortBy, searchQuery) => {
    setLoading(true);
    try {
      const businesses = await getBusinesses(sortBy, filters, searchQuery);
      setBusinesses(businesses);
    } catch (error) {
      console.error('Error fetching businesses:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 w-full px-4">
      {/* Main Container: Two-column layout on medium screens */}
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Left Sidebar: Filters */}
        <div className="w-full rounded-lg bg-white p-4 shadow md:w-1/4">
          <h5 className="mb-4 text-lg font-semibold text-gray-800">Filters</h5>

          <div className="mb-3">
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full rounded border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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

          <div className="mb-3">
            <label
              htmlFor="state"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <select
              id="state"
              name="state"
              className="w-full rounded border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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

          <div className="mb-3">
            <InputField
              id="city"
              name="city"
              type="text"
              label="City"
              value={filters.city}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, city: e.target.value }))
              }
            />
          </div>

          <div className="mb-3">
            <InputField
              id="minPrice"
              name="minPrice"
              type="number"
              label="Min Price"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
              }
            />
          </div>

          <div className="mb-3">
            <InputField
              id="maxPrice"
              name="maxPrice"
              type="number"
              label="Max Price"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
              }
            />
          </div>

          <div className="mb-3">
            <InputField
              id="minRevenue"
              name="minRevenue"
              type="number"
              label="Min Revenue"
              value={filters.minRevenue}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minRevenue: e.target.value }))
              }
            />
          </div>

          <div className="mb-3">
            <InputField
              id="maxRevenue"
              name="maxRevenue"
              type="number"
              label="Max Revenue"
              value={filters.maxRevenue}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxRevenue: e.target.value }))
              }
            />
          </div>

          <button
            className="mt-3 w-full cursor-pointer rounded-md bg-blue-600 p-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
          <button
            className="mt-2 w-full cursor-pointer rounded-md bg-gray-400 p-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-gray-500"
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
        </div>

        {/* Right Content: Search, Sort, and Business List */}
        <div className="w-full md:w-3/4">
          {/* Top Bar: Search & Sort */}
          <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Updated to make search bigger on sm+ screens */}
            <div className="w-full sm:w-2/3">
              <Search />
            </div>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="sortBy"
                className="text-sm font-medium text-gray-700"
              >
                Sort By:
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="rounded border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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

          {/* Loading Indicator */}
          {loading && (
            <p className="text-center text-sm text-gray-700">Loading...</p>
          )}

          {/* Conditional Rendering of List or Empty State */}
          {businesses.length === 0 && !loading ? (
            <p className="mt-4 text-center text-sm text-gray-500">
              No businesses found.
            </p>
          ) : (
            <BusinessesList
              list={businesses}
              canViewDetails={true}
              canContact={isLoggedIn}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessListPage;
