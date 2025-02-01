import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { getBusinesses } from '../api/DBRequests';
import Hero from '../components/Hero';
import CategoriesList from '../components/CategoriesList';
import BusinessesList from '../components/Businesses/BusinessesList';
import Subscribe from '../components/Subscribe';

const Home = () => {
  const { isLoggedIn } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [businessesList, setBusinessesList] = useState([]);

  const fetchBusinesses = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedBusinesses = await getBusinesses('', '', '', 10);
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
      <Hero />
      <div className="container-fluid mt-4">
        <CategoriesList />
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
