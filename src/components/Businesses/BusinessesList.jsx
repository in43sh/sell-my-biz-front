import BusinessCard from './BusinessCard';

const BusinessesList = ({ list = [] }) => {
  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 pb-3">
        {list.map((item) => (
          <BusinessCard key={item._id} business={item} />
        ))}
      </div>
    </div>
  );
};

export default BusinessesList;
