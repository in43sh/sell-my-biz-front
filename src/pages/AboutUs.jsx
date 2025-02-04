const AboutUs = () => {
  return (
    <div>
      <header className="bg-gray-900 py-6 text-center text-yellow-400">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-lg">
          Your trusted platform to buy and sell businesses
        </p>
      </header>

      <div className="mx-auto my-10 max-w-5xl px-6">
        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold">Our Mission</h2>
          <p className="text-gray-600">
            At SellMyBiz, our mission is to connect entrepreneurs, business
            owners, and buyers in a seamless and trustworthy environment. We
            strive to make the process of buying and selling businesses
            straightforward and secure, while fostering a community of
            like-minded individuals.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold">What We Do</h2>
          <p className="text-gray-600">
            SellMyBiz provides a platform that allows business owners to list
            their businesses for sale and connect with interested buyers. Our
            user-friendly interface, advanced filtering tools, and secure
            messaging system make the process simple for both sellers and
            buyers.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-center text-2xl font-semibold">Our Team</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-lg bg-white p-6 text-center shadow-md"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto mb-4 rounded-full"
                  style={{ width: '100px', height: '100px' }}
                />
                <h5 className="text-lg font-semibold">{member.name}</h5>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-2xl font-semibold">Why Choose Us</h2>
          <p className="text-gray-600">
            SellMyBiz stands out with our dedication to simplicity,
            transparency, and efficiency. Whether you're a seller looking to
            find the right buyer or a buyer searching for your next investment,
            we're here to make it happen.
          </p>
        </section>
      </div>

      <footer className="bg-gray-900 py-4 text-center text-white">
        <p className="mb-0">&copy; 2025 SellMyBiz. All rights reserved.</p>
      </footer>
    </div>
  );
};

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    image: 'https://via.placeholder.com/100',
  },
  { name: 'Jane Smith', role: 'CTO', image: 'https://via.placeholder.com/100' },
  {
    name: 'Emily Johnson',
    role: 'Marketing Director',
    image: 'https://via.placeholder.com/100',
  },
];

export default AboutUs;
