import Logo from '../../assets/images/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
        <div>
          <a href="/">
            <img src={Logo} alt="SellMyBiz" className="mb-4 w-48" />
          </a>
          <p className="text-gray-400">
            Discover opportunities and grow your business with SellMyBiz.
            Connect with potential buyers and sellers in a seamless platform.
          </p>
          <p className="mt-2">
            {/* <i className="fas fa-map-marker-alt mr-2 text-blue-400"></i> */}
            Seattle, WA
          </p>
          {/* <p>
            <i className="fas fa-envelope mr-2 text-blue-400"></i>
            support@sellmybiz.com
          </p> */}
          {/* <p>
            <i className="fas fa-phone-alt mr-2 text-blue-400"></i>
            +1 800 123 4567
          </p> */}
        </div>

        <div>
          <h5 className="mb-4 text-lg font-semibold">Quick Links</h5>
          <ul className="space-y-2">
            <li>
              <a className="text-gray-400 hover:text-white" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="text-gray-400 hover:text-white" href="/about-us">
                About Us
              </a>
            </li>
            <li>
              <a className="text-gray-400 hover:text-white" href="/businesses">
                Businesses
              </a>
            </li>
            <li>
              <a className="text-gray-400 hover:text-white" href="/help">
                Help
              </a>
            </li>
            <li>
              {/* <a className="text-gray-400 hover:text-white" href="/contact">
                Contact Us
              </a> */}
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-lg font-semibold">Newsletter</h5>
          <p className="mb-4 text-gray-400">
            Stay updated with our latest listings and offers.
          </p>
          <form>
            <input
              type="text"
              className="mb-3 w-full rounded-md border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              className="mb-3 w-full rounded-md border border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400"
              placeholder="Your Email"
              required
            />
            <button
              className="w-full cursor-pointer rounded-md bg-blue-600 py-2 font-semibold text-white transition duration-300 hover:bg-blue-700"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
        <p className="mb-3">
          &copy; {new Date().getFullYear()}{' '}
          <a href="/" className="font-semibold text-white hover:underline">
            SellMyBiz
          </a>
          . All Rights Reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
