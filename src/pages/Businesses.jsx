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
  const [searchParams] = useSearchParams();
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getBusinesses(sortBy, filters, searchQueryParam);
        setBusinesses(data);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy, filters, searchParams]);

  return (
    <div className="mt-6 w-full px-4">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full rounded-lg bg-gray-100 p-4 shadow md:w-1/4">
          <h5 className="mb-4 text-lg font-semibold">Filters</h5>

          <label htmlFor="category" className="mb-1 block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full rounded border p-2"
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

          <label htmlFor="state" className="mt-3 block text-sm font-medium">
            State
          </label>
          <select
            id="state"
            name="state"
            className="w-full rounded border p-2"
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

          <button className="mt-3 w-full rounded bg-blue-600 p-2 text-white">
            Apply Filters
          </button>
          <button className="mt-2 w-full rounded bg-gray-400 p-2 text-white">
            Reset Filters
          </button>
        </div>

        <div className="w-full md:w-3/4">
          <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
            <div className="w-full sm:w-auto">
              <Search />
            </div>

            <div className="flex items-center">
              <label htmlFor="sortBy" className="mr-2 text-sm font-medium">
                Sort By:
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="rounded border p-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading && <p className="text-center">Loading...</p>}

          {businesses.length === 0 && !loading ? (
            <p className="mt-4 text-center">No businesses found.</p>
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
