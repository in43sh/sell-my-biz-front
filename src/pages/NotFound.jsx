import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-6 text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
