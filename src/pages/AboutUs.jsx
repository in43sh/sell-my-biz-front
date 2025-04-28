import GradientLayout from '../components/layouts/GradientLayout';

const AboutUs = () => {
  return (
    <GradientLayout>
      <div className="max-w-4xl rounded-lg border border-blue-300 bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-blue-700">About Us</h1>
        <p className="mb-4">
          Welcome to Sell My Biz! We are a dedicated team of professionals
          committed to helping business owners sell their companies quickly and
          efficiently. Our platform connects sellers with the right buyers,
          ensuring a smooth and profitable transaction.
        </p>

        <h2 className="mt-6 mb-2 text-2xl font-semibold text-blue-700">
          Our Mission
        </h2>
        <p>
          Our mission is to simplify the business selling process by providing
          an intuitive, transparent, and secure platform for entrepreneurs.
        </p>

        <h2 className="mt-6 mb-2 text-2xl font-semibold text-blue-700">
          Why Choose Us?
        </h2>
        <ul className="list-disc pl-6 text-blue-800">
          <li>Expert guidance from experienced professionals.</li>
          <li>Secure and confidential transactions.</li>
          <li>Access to a wide network of buyers.</li>
          <li>Streamlined process to save you time and effort.</li>
        </ul>

        <h2 className="mt-6 mb-2 text-2xl font-semibold text-blue-700">
          Our Team
        </h2>
        <p>
          Our team consists of self-starters and business owners with vast
          experience.
        </p>

        <h2 className="mt-6 mb-2 text-2xl font-semibold text-blue-700">
          Contact Us
        </h2>
        <p>
          Have questions or need assistance? Reach out to us at&nbsp;
          <strong>
            <a
              href="mailto:support@sellmybiz.com"
              className="text-blue-800 underline"
            >
              support@sellmybiz.com
            </a>
          </strong>
          , and we&#39;ll be happy to help!
        </p>
      </div>
    </GradientLayout>
  );
};

export default AboutUs;
