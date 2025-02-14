import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getBusinesses } from '../api/DBRequests';
import { useAuth } from '../contexts/AuthProvider';
import BusinessesList from '../components/businesses/BusinessesList';
import InputField from '../components/form/InputField';
import Search from '../components/Search';

import emptyFilters from '../constants/emptyFilters';
import usStates from '../constants/usStates';
import categories from '../constants/categories';
import sortOptions from '../constants/sortOptions';

const BusinessListPage = () => {
  const [searchParams] = useSearchParams();
  const searchQueryFromParams = searchParams.get('query') || '';
  const categoryParam = searchParams.get('category') || '';

  const { isLoggedIn } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [filters, setFilters] = useState({
    ...emptyFilters,
    category: categoryParam || '',
  });
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: categoryParam || '' }));
  }, [categoryParam]);

  useEffect(() => {
    fetchBusinesses(filters, sortBy, searchQueryFromParams);
  }, [sortBy, searchQueryFromParams]);

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

  const handleSortChange = (e) => setSortBy(e.target.value);
  const handleApplyFilters = () =>
    fetchBusinesses(filters, sortBy, searchQueryFromParams);
  const handleResetFilters = () => {
    setFilters(emptyFilters);
    setSortBy('');
    fetchBusinesses(emptyFilters, '', '');
  };

  return (
    <div className="mt-6 w-full px-4">
      {/* Mobile */}
      <div className="mb-4 flex flex-col gap-2 md:hidden">
        <Search />
        <div className="flex items-center space-x-2">
          <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
            Sort By:
          </label>
          <select
            id="sortBy"
            name="sortBy"
            className="rounded border p-2 text-sm focus:ring-2 focus:ring-blue-600"
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

      <div className="flex flex-col gap-6 md:flex-row">
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
          <InputField
            id="city"
            label="City"
            type="text"
            value={filters.city}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, city: e.target.value }))
            }
          />
          <div className="grid grid-cols-2 gap-2">
            <InputField
              id="minPrice"
              label="Min Price"
              type="number"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
              }
            />
            <InputField
              id="maxPrice"
              label="Max Price"
              type="number"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <InputField
              id="minRevenue"
              label="Min Revenue"
              type="number"
              value={filters.minRevenue}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, minRevenue: e.target.value }))
              }
            />
            <InputField
              id="maxRevenue"
              label="Max Revenue"
              type="number"
              value={filters.maxRevenue}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxRevenue: e.target.value }))
              }
            />
          </div>
          <button
            className="mt-3 w-full cursor-pointer bg-blue-600 p-2 text-sm font-medium text-white hover:bg-blue-700"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
          <button
            className="mt-2 w-full cursor-pointer bg-gray-400 p-2 text-sm font-medium text-white hover:bg-gray-500"
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
        </div>

        <div className="w-full md:w-3/4">
          <div className="mb-4 hidden gap-2 md:flex md:justify-between">
            <Search />
            <div className="flex items-center space-x-1">
              <label
                htmlFor="sortBy"
                className="text-sm font-medium whitespace-nowrap text-gray-700"
              >
                Sort By:
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="rounded border p-2 text-sm focus:ring-2 focus:ring-blue-600"
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
          {loading ? (
            <p className="text-center text-sm text-gray-700">Loading...</p>
          ) : businesses.length === 0 ? (
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
