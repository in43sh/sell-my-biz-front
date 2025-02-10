// TODO
// TO BE DELETED
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <nav className="bg-blue-600 py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link className="text-xl font-semibold text-white" to="/">
            BizBuySell
          </Link>
          <button className="cursor-pointer text-white focus:outline-none md:hidden">
            ☰
          </button>
          <ul className="hidden space-x-6 md:flex">
            <li>
              <Link className="text-white hover:underline" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-white hover:underline" to="/businesses">
                Businesses
              </Link>
            </li>
            <li>
              <Link className="text-white hover:underline" to="/sell">
                Sell Business
              </Link>
            </li>
            <li>
              <Link className="text-white hover:underline" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <header
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://via.placeholder.com/1500x600")',
        }}
      >
        <div className="bg-opacity-50 absolute inset-0 bg-black"></div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold">
            Find Your Perfect Business
          </h1>
          <p className="mb-6 text-lg">
            Search among thousands of businesses for sale and discover
            opportunities today!
          </p>
          <div className="flex w-full max-w-lg">
            <input
              type="text"
              className="flex-1 rounded-l-md border-none p-3 text-black"
              placeholder="Search businesses..."
            />
            <button className="cursor-pointer rounded-r-md bg-white px-4 py-3 text-blue-600 hover:bg-gray-200">
              Search
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;
