import PropTypes from 'prop-types';
import useBusinessForm from '../../hooks/useBusinessForm';
import Spinner from '../../components/layouts/Spinner';
import InputField from '../Form/InputField';
import { useEffect } from 'react';

const BusinessForm = ({ id = '', evaluationData = null }) => {
  const { form, error, isLoading, handleChange, handleSubmit, setForm } =
    useBusinessForm(id);

  useEffect(() => {
    if (evaluationData) {
      setForm({
        ...form,
        name: '',
        description: '',
        category: evaluationData.details?.industry || '',
        price: evaluationData.result || '',
        grossRevenue: evaluationData.details?.grossRevenue || '',
        profit: evaluationData.details?.profit || '',
        inventoryValue: evaluationData.details?.inventory || '',
        yearsEstablished: evaluationData.details?.businessAge || '',
        employees: '',
        reasonForSelling: '',
      });
    }
  }, [evaluationData, setForm]);

  return (
    <>
      <form onSubmit={handleSubmit} className="container mt-4">
        <div className="row">
          {/* First column */}
          <div className="col-md-6">
            <InputField
              id="name"
              name="name"
              type="text"
              value={form.name}
              error={error.name}
              onChange={handleChange}
              label="Business Name"
            />
            <InputField
              id="description"
              name="description"
              type="text"
              value={form.description}
              error={error.description}
              onChange={handleChange}
              label="Description"
            />
            <InputField
              id="category"
              name="category"
              type="text"
              value={form.category}
              error={error.category}
              onChange={handleChange}
              label="Category"
            />
            <InputField
              id="price"
              name="price"
              type="number"
              min={0}
              step={0.01}
              value={form.price}
              error={error.price}
              onChange={handleChange}
              label="Price"
            />
            <InputField
              id="grossRevenue"
              name="grossRevenue"
              type="number"
              min={0}
              value={form.grossRevenue}
              error={error.grossRevenue}
              onChange={handleChange}
              label="Gross Revenue"
            />
            <InputField
              id="profit"
              name="profit"
              type="number"
              min={0}
              value={form.profit}
              error={error.profit}
              onChange={handleChange}
              label="Profit"
            />
          </div>

          {/* Second column */}
          <div className="col-md-6">
            <InputField
              id="cashFlow"
              name="cashFlow"
              type="number"
              min={0}
              value={form.cashFlow}
              error={error.cashFlow}
              onChange={handleChange}
              label="Cash Flow"
            />
            <InputField
              id="inventoryValue"
              name="inventoryValue"
              type="number"
              min={0}
              value={form.inventoryValue}
              error={error.inventoryValue}
              onChange={handleChange}
              label="Inventory Value"
            />
            <InputField
              id="address"
              name="address"
              type="text"
              value={form.address}
              error={error.address}
              onChange={handleChange}
              label="Address"
            />
            <InputField
              id="city"
              name="city"
              type="text"
              value={form.city}
              error={error.city}
              onChange={handleChange}
              label="City"
            />
            <InputField
              id="state"
              name="state"
              type="text"
              value={form.state}
              error={error.state}
              onChange={handleChange}
              label="State"
            />
            <InputField
              id="zipCode"
              name="zipCode"
              type="text"
              value={form.zipCode}
              error={error.zipCode}
              onChange={handleChange}
              label="ZIP Code"
            />
          </div>
        </div>

        {/* Third column */}
        <div className="row mt-4">
          <div className="col-md-6">
            <InputField
              id="ownerName"
              name="ownerName"
              type="text"
              value={form.ownerName}
              error={error.ownerName}
              onChange={handleChange}
              label="Owner Name"
            />
            <InputField
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={form.contactEmail}
              error={error.contactEmail}
              onChange={handleChange}
              label="Contact Email"
            />
            <InputField
              id="yearsEstablished"
              name="yearsEstablished"
              type="number"
              min={0}
              max={new Date().getFullYear()}
              value={form.yearsEstablished}
              error={error.yearsEstablished}
              onChange={handleChange}
              label="Years Established"
            />
            <InputField
              id="employees"
              name="employees"
              type="number"
              min={0}
              value={form.employees}
              error={error.employees}
              onChange={handleChange}
              label="Number of Employees"
            />
          </div>

          <div className="col-md-6">
            <InputField
              id="reasonForSelling"
              name="reasonForSelling"
              type="text"
              value={form.reasonForSelling}
              error={error.reasonForSelling}
              onChange={handleChange}
              label="Reason for Selling"
            />
            <InputField
              id="image"
              name="image"
              type="text"
              value={form.image}
              error={error.image}
              onChange={handleChange}
              label="Image URL"
            />
          </div>
        </div>

        {/* Form actions */}
        <div className="mt-4 text-center">
          <button type="button" className="btn btn-secondary mx-2">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary mx-2">
            Save
          </button>
        </div>

        {/* Display error and loading */}
        {error.form && <p className="text-danger mt-3">{error.form}</p>}
        {isLoading && <Spinner />}
      </form>
    </>
  );
};

BusinessForm.propTypes = {
  id: PropTypes.string,
  evaluationData: PropTypes.object,
};

export default BusinessForm;
