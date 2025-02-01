import Search from './Search';

const Hero = () => (
  <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-100 via-white to-green-100">
    <div className="flex flex-grow flex-col items-center justify-center px-4 py-16 md:py-24">
      <h1 className="mb-4 text-5xl font-extrabold text-blue-800">
        Find Your Perfect Business
      </h1>
      <p className="mb-8 max-w-4xl text-center text-lg text-gray-700">
        Your one-stop solution for buying and selling businesses. Discover new
        opportunities or find the perfect buyer for your business.
      </p>
      <Search />
    </div>
  </div>
);

export default Hero;
