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
        <Link
          to={`businesses?${category.name}`}
          className="cat-img position-relative mb-3 overflow-hidden"
          state={{
            name: category.name,
          }}
        >
          <img className="img-fluid" src={category.image} alt={category.name} />
        </Link>
        {/* <Link
          to={`/businesses?category=${category.id}`}
          state={{ name: category.name }}
        >
          Go to Category
        </Link> */}
        <h5 className="font-weight-semi-bold m-0">{category.name}</h5>
      </div>
    </div>
  );
};

export default Category;
