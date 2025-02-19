import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/businesses?category=${encodeURIComponent(category.name)}`}
      className="group block overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:shadow-lg"
    >
      <img
        src={category.image}
        alt={category.name}
        className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
      />
      <div className="p-4 text-center">
        <h5 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600">
          {category.name}
        </h5>
      </div>
    </Link>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
