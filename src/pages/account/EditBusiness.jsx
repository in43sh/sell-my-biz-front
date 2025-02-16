import { useParams } from 'react-router-dom';
import BusinessForm from '../../components/businesses/BusinessForm';

const EditBusiness = () => {
  const { id } = useParams();

  return (
    <div className="mx-auto w-full max-w-2xl px-4">
      <h1 className="mb-6 text-center text-2xl font-bold">Edit Business</h1>
      <BusinessForm id={id} />
    </div>
  );
};

export default EditBusiness;
