// import Hero from '../components/Hero';
import BusinessesListWithFilter from '../components/businesses/BusinessesListWithFilter';
import CategoriesList from '../components/categories/CategoriesList';
import Subscribe from '../components/Subscribe';

const Home = () => {
  return (
    <>
      {/* <Hero /> */}
      <BusinessesListWithFilter />
      <div className="container mx-auto mt-4">
        <CategoriesList />
        <Subscribe />
      </div>
    </>
  );
};

export default Home;
