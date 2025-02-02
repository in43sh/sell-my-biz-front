import { Link } from 'react-router-dom';
import automotive from '../../assets/images/categories//automotive.jpg';
import childcare from '../../assets/images/categories/childcare.jpg';
import construction from '../../assets/images/categories/construction.jpg';
import eCommerce from '../../assets/images/categories/e-commerce.jpg';
import education from '../../assets/images/categories/education.jpg';
import entertainmentEvents from '../../assets/images/categories/entertainment-events.jpg';
import food from '../../assets/images/categories/food.jpg';
import healthWellness from '../../assets/images/categories/health-wellness.jpg';
import homeServices from '../../assets/images/categories/home-services.jpg';
import hospitality from '../../assets/images/categories/hospitality.jpg';
import professionalServices from '../../assets/images/categories/professional-services.jpg';
import realEstate from '../../assets/images/categories/real-estate.jpg';
import retail from '../../assets/images/categories/retail.jpg';
import technology from '../../assets/images/categories/technology.jpg';

const CategoriesList = () => {
  const categoriesData = [
    { image: automotive, name: 'Automotive' },
    { image: childcare, name: 'Home Services' },
    { image: construction, name: 'Retail' },
    { image: eCommerce, name: 'E-commerce' },
    { image: education, name: 'Food' },
    { image: entertainmentEvents, name: 'Health & Wellness' },
    { image: food, name: 'Education' },
    { image: healthWellness, name: 'Childcare' },
    { image: homeServices, name: 'Entertainment & Events' },
    { image: hospitality, name: 'Technology' },
    { image: professionalServices, name: 'Manufacturing' },
    { image: realEstate, name: 'Real Estate' },
    { image: retail, name: 'Construction' },
    { image: technology, name: 'Other' },
  ];

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 pb-3">
        {categoriesData.map((category, index) => (
          <div key={index} className="col-lg-4 col-md-6 pb-1">
            <div className="card mb-4">
              <img
                src={category.image}
                className="card-img-top"
                alt={category.name}
              />
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                {/*
                  We link to /businesses, passing the category name as a query param.
                  e.g., /businesses?category=Automotive
                */}
                <Link
                  to={`/businesses?category=${encodeURIComponent(category.name)}`}
                  className="btn btn-primary"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
