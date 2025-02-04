import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setSearchQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

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
        placeholder="Enter business name"
        className="w-full rounded-l-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="cursor-pointer rounded-r-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
