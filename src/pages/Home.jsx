import { useState, useEffect, useCallback } from 'react';

import { getBusinesses } from '../api/DBRequests';
import BusinessesList from '../components/Businesses/BusinessesList';
import Categories from '../components/Categories';

import Navbar from '../components/Navbar';
import Subscribe from '../components/Subscribe';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [businessesList, setBusinessesList] = useState([]);
  const [error, setError] = useState('');

  const fetchBusinesses = useCallback(async () => {
    setIsLoading(true);
    try {
      setBusinessesList(await getBusinesses('', { isAvailable: true }, 10));
    } catch (error) {
      setError('Failed to load books. Please try again later.');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  useEffect(() => {
    console.log('businessesList ===> ', businessesList);
  }, [businessesList]);

  return (
    <>
      <Navbar />
      <Categories />
      <Subscribe />
      <BusinessesList list={businessesList} />
    </>
  );
};

export default Home;
