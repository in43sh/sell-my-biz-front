import BusinessCard from './BusinessCard';

const BusinessesList = ({
  list,
  canEdit = false,
  canDelete = false,
  canViewDetails = false,
  canContact = false,
  updateList,
}) => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {list.length === 0 ? (
        <p className="text-center text-gray-600">No businesses found.</p>
      ) : (
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
      )}
    </div>
  );
};

export default BusinessesList;
