import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setSearchQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the businesses page with the search query as a URL parameter.
    console.log('searchQuery ===> ', searchQuery);

    navigate({
      pathname: '/businesses',
      search: createSearchParams({
        query: searchQuery,
      }).toString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-4xl">
      <input
        type="text"
        value={searchQuery}
        // placeholder="Enter business name, category or location"
        placeholder="Enter business name"
        className="w-full rounded-l-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="rounded-r-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
