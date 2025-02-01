import { useState, useEffect } from 'react';
// import Navbar from './Navbar'; // adjust path if needed
import Categories from '../components/Categories'; // adjust path if needed
import BusinessesList from '../components/Businesses/BusinessesList'; // adjust path if needed
import Subscribe from '../components/Subscribe'; // adjust path if needed

const Home = () => {
  // State for the search bar
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy states for the "Just Arrived" section.
  // In a real app, these might come from an API request.
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [businessesList, setBusinessesList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log('Searching for:', searchQuery);
  };

  // (Optional) useEffect to load businesses data
  // useEffect(() => {
  //   setIsLoading(true);
  //   // Fetch businesses and update state...
  // }, []);

  return (
    <>
      {/* Top Navigation */}
      {/* <Navbar /> */}

      {/* Main Hero Section */}
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-100 via-white to-green-100">
        <div className="flex flex-grow flex-col items-center justify-center px-4 py-16 md:py-24">
          <h1 className="mb-4 text-5xl font-extrabold text-blue-800">
            Find Your Perfect Business
          </h1>
          <p className="mb-8 max-w-4xl text-center text-lg text-gray-700">
            Your one-stop solution for buying and selling businesses. Discover
            new opportunities or find the perfect buyer for your business.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-4xl">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full rounded-l-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Additional Content Section */}
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
