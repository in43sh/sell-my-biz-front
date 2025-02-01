import { Link } from 'react-router-dom';

const Category = ({ category }) => {
  const catItemStyle = {
    padding: '30px',
  };
  return (
    <div className="col-lg-4 col-md-6 pb-1">
      <div
        className="cat-item d-flex flex-column mb-4 border"
        style={catItemStyle}
      >
        <p className="text-right">{category.count} Products</p>
        <Link to="/" className="cat-img position-relative mb-3 overflow-hidden">
          <img
            className="img-fluid"
            src={category.image}
            alt={category.title}
          />
        </Link>
        <h5 className="font-weight-semi-bold m-0">{category.title}</h5>
      </div>
    </div>
  );
};

export default Category;
