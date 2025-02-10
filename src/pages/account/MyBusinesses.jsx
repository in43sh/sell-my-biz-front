import { useState, useEffect, useCallback } from 'react';
import { getUserBusinesses } from '../../api/DBRequests';
import BusinessesList from '../../components/businesses/BusinessesList';
import Spinner from '../../components/layouts/Spinner';
import { useAuth } from '../../contexts/AuthProvider';

const MyBusinesses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [businessesList, setBusinessesList] = useState([]);
  const [sortBy, setSortBy] = useState('-createdAt');
  const { userId, token } = useAuth();
  const [error, setError] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(true);

  const BUSINESSES_LIMIT = 50;

  const fetchBusinesses = useCallback(
    async (skip = 0) => {
      setIsLoading(true);
      try {
        const fetchBusinesses = await getUserBusinesses(
          sortBy,
          { userId: userId },
          '',
          BUSINESSES_LIMIT,
          skip,
          token
        );

        setBusinessesList((prevBusinesses) =>
          skip === 0 ? fetchBusinesses : [...prevBusinesses, ...fetchBusinesses]
        );

        setShowLoadMore(fetchBusinesses.length >= BUSINESSES_LIMIT);
      } catch (error) {
        setError('Failed to load businesses. Please try again later.');
      }
      setIsLoading(false);
    },
    [sortBy, userId]
  );

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <h2 className="mb-6 text-center text-2xl font-semibold">My Businesses</h2>

      {error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : isLoading ? (
        <Spinner />
      ) : businessesList.length === 0 ? (
        <p className="text-center text-gray-600">No businesses found.</p>
      ) : (
        <BusinessesList
          list={businessesList}
          canEdit={true}
          canDelete={true}
          canViewDetails={false}
          canContact={false}
          updateList={fetchBusinesses}
        />
      )}

      {showLoadMore && !isLoading && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => fetchBusinesses(businessesList.length)}
            className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition duration-300 hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBusinesses;
