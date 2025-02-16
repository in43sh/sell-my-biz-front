import BusinessCard from './BusinessCard';
import Spinner from '../../components/common/Spinner';

const BusinessesList = ({
  list,
  loading,
  canEdit = false,
  canDelete = false,
  canViewDetails = false,
  canContact = false,
  updateList,
}) => {
  if (loading) {
    return <Spinner />;
  }

  if (list.length === 0) {
    return <p className="text-center text-gray-600">No businesses found.</p>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {list.map((business) => (
          <BusinessCard
            key={business._id}
            business={business}
            canEdit={canEdit}
            canDelete={canDelete}
            canViewDetails={canViewDetails}
            canContact={canContact}
            updateList={updateList}
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessesList;
