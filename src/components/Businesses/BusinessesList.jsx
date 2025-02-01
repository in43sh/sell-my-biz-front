import BusinessCard from './BusinessCard';

const BusinessesList = ({
  list,
  canEdit = false,
  canDelete = false,
  canViewDetails = false,
  canContact = false,
  // showPrice = false,
  // canDeleteSaved = false,
  // showListings = false,
  updateList,
  // isLinkList = false,
}) => {
  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 pb-3">
        {list.map(
          (
            business
            // index
          ) => (
            // TODO
            // is it safe to use index?
            // figure out if it's okay to do key={business._id || index}
            <BusinessCard
              key={business._id} // Use _id if available, or fallback to index
              business={business}
              canEdit={canEdit}
              canDelete={canDelete}
              canViewDetails={canViewDetails}
              canContact={canContact}
              updateList={updateList}
              // isLink={isLinkList}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BusinessesList;
