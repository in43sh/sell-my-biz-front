import BusinessForm from '../../components/Businesses/BusinessForm';
import { useAccount } from '../../contexts/AccountProvider';

const EditBusiness = () => {
  const { currentBusinessId } = useAccount();

  return (
    <>
      <h1 className="font-headings mb-6 flex justify-center text-2xl font-bold">
        Edit Business
      </h1>

      <BusinessForm id={currentBusinessId} />
    </>
  );
};

export default EditBusiness;
