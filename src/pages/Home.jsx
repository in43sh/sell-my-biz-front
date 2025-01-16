import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 px-4">
      <h1 className="mb-4 text-5xl font-extrabold text-blue-800">
        Welcome to <span className="text-green-600">Sell My Biz</span>
      </h1>
      <p className="mb-8 max-w-md text-center text-lg text-gray-700">
        Your one-stop solution for buying and selling businesses. Discover new
        opportunities or find the perfect buyer for your business.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/sign-in"
          className="rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-blue-700 hover:shadow-lg"
        >
          Sign In
        </Link>
        <Link
          to="/sign-up"
          className="rounded-lg bg-green-600 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-green-700 hover:shadow-lg"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
