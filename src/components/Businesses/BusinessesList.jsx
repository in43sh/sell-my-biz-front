import BusinessCard from './BusinessCard';

const BusinessesList = ({ list = [] }) => {
  console.log('list ===> ', list);
  return (
    <div className="container-fluid pt-5">
      <div className="mb-4 text-center">
        <h2 className="section-title px-5">
          <span className="px-2">Just Arrived</span>
        </h2>
      </div>
      <div className="row px-xl-5 pb-3">
        {list.map((item) => (
          <BusinessCard key={item._id} business={item} />
        ))}
      </div>
    </div>
  );
};

export default BusinessesList;
