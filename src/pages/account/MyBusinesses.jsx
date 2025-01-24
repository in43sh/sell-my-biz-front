import { useState, useEffect, useCallback } from 'react';

import { getBusinesses } from '../../api/DBRequests';
import AddBusinessButton from '../../components/account/AddBusinessButton';
import BusinessesList from '../../components/Businesses/BusinessesList';
// import LoadMoreButton from '../../components/Businesses/LoadMoreButton';
import Spinner from '../../components/layouts/Spinner';
import { useAuth } from '../../contexts/AuthProvider';
// import { sortingOptions } from '../../utils/selectUtils';

const MyBusinesses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [businessesList, setBusinessesList] = useState([]);
  const [sortBy, setSortBy] = useState('-createdAt');
  const { userId } = useAuth();
  const [error, setError] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(true);

  const BUSINESSES_LIMIT = 50;

  const fetchBusinesses = useCallback(
    async (skip = 0) => {
      setIsLoading(true);
      try {
        const fetchBusinesses = await getBusinesses(
          sortBy,
          { userId: userId },
          BUSINESSES_LIMIT,
          skip
        );

        skip === 0
          ? setBusinessesList(fetchBusinesses)
          : setBusinessesList((prevBusinesses) => [
              ...prevBusinesses,
              ...fetchBusinesses,
            ]);

        fetchBusinesses.length < BUSINESSES_LIMIT
          ? setShowLoadMore(false)
          : setShowLoadMore(true);
      } catch (error) {
        setError('Failed to load businesses. Please try again later.');
      }
      setIsLoading(false);
    },
    [sortBy, userId]
  );

  // const handleLoadMoreBusinesses = () => {
  //   fetchBusinesses(businessesList.length);
  // };

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  // const handleSortSelect = (name, value) => {
  //   setSortBy(value);
  // };

  return (
    <>
      <div className="d-flex justify-content-center justify-content-sm-end mb-4 gap-2">
        <div className="d-sm-none">
          <AddBusinessButton />
        </div>

        {/* <div className="w-auto">
          <LabelAndSelect
            id="sortBy"
            name="sortBy"
            value={sortBy}
            data={sortingOptions}
            onChange={handleSortSelect}
            className="form-control"
          ></LabelAndSelect>
        </div> */}
      </div>

      {error ? (
        <p className="text-danger">{error}</p>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <>
          <BusinessesList
            list={businessesList}
            canEdit={true}
            canDelete={true}
            canViewDetails={false}
            canContact={false}
            updateList={fetchBusinesses}
          />
          {/* {showLoadMore && (
            <div className="d-flex justify-content-center mt-3">
              <LoadMoreButton onClick={handleLoadMoreBusinesses} />
            </div>
          )} */}
        </>
      )}
    </>
  );
};

export default MyBusinesses;
