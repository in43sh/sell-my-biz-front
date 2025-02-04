import { useLocation } from 'react-router-dom';
import BusinessForm from '../../components/businesses/BusinessForm';

const AddBusiness = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="mx-auto w-full max-w-2xl px-4">
      <h1 className="mb-6 text-center text-2xl font-bold">Add New Business</h1>
      <BusinessForm evaluationData={state} />
    </div>
  );
};

export default AddBusiness;
