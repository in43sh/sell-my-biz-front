import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import { useAuth } from '../contexts/AuthProvider';
import { getBusiness } from '../api/DBRequests';

const BusinessDetail = () => {
  const { isLoggedIn } = useAuth();
  const { id } = useParams(); // Get the business ID from the URL
  const [business, setBusiness] = useState(null);
  //   const [relatedBusinesses, setRelatedBusinesses] = useState([]);
  //   const [authenticated, setAuthenticated] = useState(false); // Mock authentication state

  const getBusinessData = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const businessData = await getBusiness(headers, id);
      setBusiness(businessData);
    } catch (error) {
      console.error('Error fetching business data:', error);
    }
  };

  useEffect(() => {
    getBusinessData();
  }, [id]);

  if (!business) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  return (
    <div className="container py-5">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/businesses">Businesses</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {business.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Main Content */}
        <div className="col-lg-8">
          <h1 className="mb-4">{business.name}</h1>
          <h5 className="text-muted mb-4">{business.category}</h5>

          {/* Image Carousel */}
          <div
            id="businessCarousel"
            className="carousel slide mb-4"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {business.images?.map((image, index) => (
                <div
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  key={index}
                >
                  <img
                    src={image}
                    className="d-block w-100"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#businessCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#businessCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Business Details */}
          <h3 className="text-primary">${business.price.toLocaleString()}</h3>
          <p className="mb-4">{business.description}</p>

          {/* Contact Information */}
          {isLoggedIn ? (
            <div className="card mb-4">
              <div className="card-body">
                <h5>Contact Information</h5>
                <p>
                  <i className="fa fa-user text-primary me-2"></i>
                  {business.ownerName}
                </p>
                <p>
                  <i className="fa fa-envelope text-primary me-2"></i>
                  {business.contactEmail}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-danger">
              Please log in to view contact information.
            </p>
          )}
        </div>
        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Business Highlights</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Revenue: ${business.grossRevenue.toLocaleString()}
                </li>
                <li className="list-group-item">
                  Cash Flow: ${business.cashFlow.toLocaleString()}
                </li>
                <li className="list-group-item">
                  Employees: {business.employees}
                </li>
                <li className="list-group-item">
                  Location: {business.city}, {business.state}
                </li>
              </ul>
            </div>
          </div>

          <button className="btn btn-primary w-100">Message Owner</button>
        </div>
      </div>

      {/* Related Businesses */}
      {/* <div className="mt-5">
        <h4 className="mb-4">You May Also Like</h4>
        <div className="row">
          {relatedBusinesses.slice(0, 3).map((related) => (
            <div className="col-lg-4 col-md-6 mb-4" key={related.id}>
              <div className="card h-100">
                <img
                  src={related.images[0]}
                  className="card-img-top"
                  alt={related.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{related.name}</h5>
                  <p className="card-text">${related.price.toLocaleString()}</p>
                  <a
                    href={`/business/${related.id}`}
                    className="btn btn-primary w-100"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default BusinessDetail;
