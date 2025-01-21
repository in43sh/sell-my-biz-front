import { useState, useEffect, useCallback } from 'react';

import { getBusinesses } from '../../api/DBRequests';
import AddBookButton from '../../components/account/AddBusinessButton';
import BusinessesList from '../../components/Businesses/BusinessesList';
// import LoadMoreButton from '../../components/Books/LoadMoreButton';
// import LabelAndSelect from '../../components/Form/LabelAndSelect';
import Spinner from '../../components/layouts/Spinner';
import { useAuth } from '../../contexts/AuthProvider';
// import { sortingOptions } from '../../utils/selectUtils';

const MyBusinesses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [booksList, setBooksList] = useState([]);
  const [sortBy, setSortBy] = useState('-createdAt');
  const { userId } = useAuth();
  const [error, setError] = useState('');
  const [showLoadMore, setShowLoadMore] = useState(true);

  const BOOKS_LIMIT = 50;

  const fetchBooks = useCallback(
    async (skip = 0) => {
      setIsLoading(true);
      try {
        const fetchedBooks = await getBusinesses(
          sortBy,
          { userId: userId },
          BOOKS_LIMIT,
          skip
        );

        skip === 0
          ? setBooksList(fetchedBooks)
          : setBooksList((prevBooks) => [...prevBooks, ...fetchedBooks]);

        fetchedBooks.length < BOOKS_LIMIT
          ? setShowLoadMore(false)
          : setShowLoadMore(true);
      } catch (error) {
        setError('Failed to load books. Please try again later.');
      }
      setIsLoading(false);
    },
    [sortBy, userId]
  );

  // const handleLoadMoreBooks = () => {
  //   fetchBooks(booksList.length);
  // };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // const handleSortSelect = (name, value) => {
  //   setSortBy(value);
  // };

  return (
    <>
      <div className="d-flex justify-content-center justify-content-sm-end mb-4 gap-2">
        <div className="d-sm-none">
          <AddBookButton />
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
            list={booksList}
            canEdit={true}
            canDelete={true}
            updateList={fetchBooks}
          />
          {/* {showLoadMore && (
            <div className="d-flex justify-content-center mt-3">
              <LoadMoreButton onClick={handleLoadMoreBooks} />
            </div>
          )} */}
        </>
      )}
    </>
  );
};

export default MyBusinesses;
