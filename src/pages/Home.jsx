import Categories from '../components/Categories';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Subscribe from '../components/Subscribe';

const Home = () => {
  return (
    <>
      <Navbar />
      <Categories />
      <Subscribe />
      <Products />
    </>
  );
};

export default Home;
