import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 px-4">
            <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
                Welcome to <span className="text-green-600">Sell My Biz</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
                Your one-stop solution for buying and selling businesses.
                Discover new opportunities or find the perfect buyer for your
                business.
            </p>
            <div className="flex space-x-4">
                <Link
                    to="/sign-in"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
                >
                    Sign In
                </Link>
                <Link
                    to="/sign-up"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Home;
