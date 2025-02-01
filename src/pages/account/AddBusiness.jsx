import React from 'react';
import { useLocation } from 'react-router-dom';
import BusinessForm from '../../components/businesses/BusinessForm';

const AddBusiness = () => {
  const location = useLocation();
  const { state } = location; // Extract result and details passed via navigate

  return (
    <>
      <h1 className="font-headings mb-6 flex justify-center text-2xl font-bold">
        Add New Business
      </h1>
      {/* Pass the evaluation data (result and details) to BusinessForm */}
      <BusinessForm evaluationData={state} />
    </>
  );
};

export default AddBusiness;
