import { useState, useEffect, useCallback } from 'react';

import { useAuth } from '../contexts/AuthProvider';
import { getBusinesses } from '../api/DBRequests';
import BusinessesList from '../components/Businesses/BusinessesList';
import Categories from '../components/Categories';

import Navbar from '../components/Navbar';
import Subscribe from '../components/Subscribe';

const Home = () => {
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [businessesList, setBusinessesList] = useState([]);
  const [error, setError] = useState('');

  const fetchBusinesses = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedBusinesses = await getBusinesses(
        '',
        { isAvailable: true },
        10
      );
      setBusinessesList(fetchedBusinesses);
    } catch (error) {
      setError('Failed to load businesses. Please try again later.');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4">
        <Categories />
        <div className="container-fluid pt-5">
          <div className="mb-4 text-center">
            <h2 className="section-title px-5">
              <span className="bg-light text-dark px-3">Just Arrived</span>
            </h2>
          </div>
          {error ? (
            <div className="alert alert-danger mt-4 text-center">{error}</div>
          ) : isLoading ? (
            <div className="mt-4 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <BusinessesList
              list={businessesList}
              canViewDetails={true}
              canContact={isLoggedIn ? true : false}
            />
          )}
        </div>
        <Subscribe />
      </div>
    </>
  );
};

export default Home;
