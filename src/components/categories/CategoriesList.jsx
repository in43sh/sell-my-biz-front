import Category from './Category';
import defaultCover from '../assets/images/default-cover.jpg';

const CategoriesList = () => {
  // TODO
  // get data dynamically
  const categoriesData = [
    { image: defaultCover, title: 'Automotive', count: 15 },
    { image: defaultCover, title: 'Home Services', count: 15 },
    { image: defaultCover, title: 'Retail', count: 15 },
    { image: defaultCover, title: 'E-commerce', count: 15 },
    { image: defaultCover, title: 'Food', count: 15 },
    { image: defaultCover, title: 'Hospitality', count: 15 },
  ];

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 pb-3">
        {categoriesData.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
