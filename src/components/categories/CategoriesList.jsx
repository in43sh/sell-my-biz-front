import categoriesData from '../../constants/categoriesData';
import CategoryCard from './CategoryCard';

const CategoriesList = () => {
  return (
    <div className="w-full px-6 py-10">
      <h2 className="mb-8 text-center text-3xl font-semibold">
        Browse Categories
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categoriesData.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
