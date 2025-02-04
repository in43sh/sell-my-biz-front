import BusinessForm from '../../components/businesses/BusinessForm';
import { useAccount } from '../../contexts/AccountProvider';

const EditBusiness = () => {
  const { currentBusinessId } = useAccount();

  return (
    <div className="mx-auto w-full max-w-2xl px-4">
      <h1 className="mb-6 text-center text-2xl font-bold">Edit Business</h1>
      <BusinessForm id={currentBusinessId} />
    </div>
  );
};

export default EditBusiness;
