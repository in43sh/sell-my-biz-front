const Subscribe = () => {
  const handleClick = (e) => {
    e.target.classList.add('shake');
    setTimeout(() => e.target.classList.remove('shake'), 500);
  };

  return (
    <div className="my-10 w-full bg-gray-200 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-3 text-3xl font-bold">Stay Updated</h2>
        <p className="mb-6 text-gray-600">
          Subscribe to our newsletter and never miss out on the latest updates,
          exclusive content, and special offers.
        </p>
        <form className="flex flex-col justify-center gap-4 sm:flex-row">
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 p-3 sm:w-auto"
            placeholder="Email Goes Here"
            required
          />
          <button
            type="button"
            onClick={handleClick}
            className="shake-button cursor-pointer rounded-md bg-blue-600 px-6 py-3 text-white transition duration-300 hover:bg-blue-700"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
