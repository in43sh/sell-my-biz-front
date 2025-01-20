import { useState, useEffect, useCallback } from 'react';

const AboutUs = () => {
  return (
    <div>
      <header className="bg-dark text-warning text-center py-4">
        <h1>About Us</h1>
        <p>Your trusted platform to buy and sell businesses</p>
      </header>

      <div className="container my-5">
        {/* Mission Section */}
        <section className="mb-5">
          <h2 className="text-dark mb-3">Our Mission</h2>
          <p className="text-secondary">
            At SellMyBiz, our mission is to connect entrepreneurs, business owners, and buyers
            in a seamless and trustworthy environment. We strive to make the process of buying
            and selling businesses straightforward and secure, while fostering a community of
            like-minded individuals.
          </p>
        </section>

        {/* What We Do Section */}
        <section className="mb-5">
          <h2 className="text-dark mb-3">What We Do</h2>
          <p className="text-secondary">
            SellMyBiz provides a platform that allows business owners to list their businesses
            for sale and connect with interested buyers. Our user-friendly interface, advanced
            filtering tools, and secure messaging system make the process simple for both sellers
            and buyers.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-5">
          <h2 className="text-dark mb-3">Our Team</h2>
          <div className="row g-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="col-md-4 text-center">
                <div className="card h-100 border-light shadow-sm">
                  <div className="card-body">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-circle mb-3"
                      style={{ width: '100px', height: '100px' }}
                    />
                    <h5 className="card-title">{member.name}</h5>
                    <p className="card-text text-muted">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-5">
          <h2 className="text-dark mb-3">Why Choose Us</h2>
          <p className="text-secondary">
            SellMyBiz stands out with our dedication to simplicity, transparency, and efficiency.
            Whether you're a seller looking to find the right buyer or a buyer searching for your
            next investment, we're here to make it happen.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; 2025 SellMyBiz. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Sample team data
const teamMembers = [
  { name: 'John Doe', role: 'Founder & CEO', image: 'https://via.placeholder.com/100' },
  { name: 'Jane Smith', role: 'CTO', image: 'https://via.placeholder.com/100' },
  { name: 'Emily Johnson', role: 'Marketing Director', image: 'https://via.placeholder.com/100' },
];

export default AboutUs;
