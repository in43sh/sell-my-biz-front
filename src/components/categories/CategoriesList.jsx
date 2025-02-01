import { Link } from 'react-router-dom';
import defaultCover from '../../assets/images/default-cover.jpg';

const CategoriesList = () => {
  // Pretend these come from your API or static data
  const categoriesData = [
    { image: defaultCover, name: 'Automotive', url: '' },
    { image: defaultCover, name: 'Home Services', url: '' },
    { image: defaultCover, name: 'Retail', url: '' },
    { image: defaultCover, name: 'E-commerce', url: '' },
    { image: defaultCover, name: 'Food', url: '' },
    { image: defaultCover, name: 'Hospitality', url: '' },
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
