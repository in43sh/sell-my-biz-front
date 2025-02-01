const AddBusinessButton = () => {
  // TODO
  // check why there is no logic for this button
  const handleAddBusiness = () => {
    // Logic to handle adding a business
    console.log('Add Business button clicked');
  };

  return (
    <button
      onClick={handleAddBusiness}
      className="btn btn-primary d-flex align-items-center px-4 py-2"
    >
      <i className="fa fa-plus mr-2"></i>
      Add Business
    </button>
  );
};

export default AddBusinessButton;
