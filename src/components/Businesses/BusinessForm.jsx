import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useBusinessForm from '../../hooks/useBusinessForm';
import Spinner from '../../components/layouts/Spinner';
import InputField from '../Form/InputField';
import AddImage from './AddImage';

const BusinessForm = ({ id = '', evaluationData = null }) => {
  const {
    form,
    error,
    imageSrc,
    isLoading,
    setForm,
    setFile,
    setImageSrc,
    handleFileUpload,
    handleChange,
    handleSubmit,
  } = useBusinessForm(id);

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
        isListedByOwner: false,
        preferredContactMethod: '',
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
              value={(form.name = 'Test Business 123')}
              error={error.name}
              onChange={handleChange}
              label="Business Name"
            />
            <InputField
              id="description"
              name="description"
              type="text"
              value={(form.description = 'Test Business Description')}
              error={error.description}
              onChange={handleChange}
              label="Description"
            />
            <InputField
              id="category"
              name="category"
              type="text"
              value={(form.category = 'Services')}
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
              value={(form.price = 500000)}
              error={error.price}
              onChange={handleChange}
              label="Price"
            />
            <InputField
              id="grossRevenue"
              name="grossRevenue"
              type="number"
              min={0}
              value={(form.grossRevenue = 1200000)}
              error={error.grossRevenue}
              onChange={handleChange}
              label="Gross Revenue"
            />
            <InputField
              id="profit"
              name="profit"
              type="number"
              min={0}
              value={(form.profit = 240000)}
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
              value={(form.cashFlow = 200000)}
              error={error.cashFlow}
              onChange={handleChange}
              label="Cash Flow"
            />
            <InputField
              id="inventoryValue"
              name="inventoryValue"
              type="number"
              min={0}
              value={(form.inventoryValue = 80000)}
              error={error.inventoryValue}
              onChange={handleChange}
              label="Inventory Value"
            />
            <InputField
              id="address"
              name="address"
              type="text"
              value={(form.address = '147 Oak Avenue')}
              error={error.address}
              onChange={handleChange}
              label="Address"
            />
            <InputField
              id="city"
              name="city"
              type="text"
              value={(form.city = 'Seattle')}
              error={error.city}
              onChange={handleChange}
              label="City"
            />
            <InputField
              id="state"
              name="state"
              type="text"
              value={(form.state = 'WA')}
              error={error.state}
              onChange={handleChange}
              label="State"
            />
            <InputField
              id="zipCode"
              name="zipCode"
              type="text"
              value={(form.zipCode = '98101')}
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
              value={(form.ownerName = 'David King')}
              error={error.ownerName}
              onChange={handleChange}
              label="Owner Name"
            />
            <InputField
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={(form.contactEmail = 'davidking@eventmasters.com')}
              error={error.contactEmail}
              onChange={handleChange}
              label="Contact Email"
            />
            <InputField
              id="phoneNumber"
              name="phoneNumber"
              type="phone"
              value={(form.phoneNumber = '+12065551234')}
              error={error.phoneNumber}
              onChange={handleChange}
              label="Contact Phone Number"
            />
            <InputField
              id="yearsEstablished"
              name="yearsEstablished"
              type="number"
              min={0}
              max={new Date().getFullYear()}
              value={(form.yearsEstablished = 10)}
              error={error.yearsEstablished}
              onChange={handleChange}
              label="Years Established"
            />
            <InputField
              id="employees"
              name="employees"
              type="number"
              min={0}
              value={(form.employees = 16)}
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
              value={(form.reasonForSelling = 'Relocation')}
              error={error.reasonForSelling}
              onChange={handleChange}
              label="Reason for Selling"
            />
            {/* <InputField
              id="image"
              name="image"
              type="text"
              value={
                (form.image =
                  'DEFAULT_IMAGE_URL=https://res.cloudinary.com/dqgqk1sqq/image/upload/default_cover.jpg')
              }
              error={error.image}
              onChange={handleChange}
              label="Image URL"
            /> */}
            {/* <InputField
              id="isListedByOwner"
              name="isListedByOwner"
              // type="text"
              // value={form.isListedByOwner}
              value={(form.isListedByOwner = false)}
              error={error.isListedByOwner}
              onChange={handleChange}
              label="Is Listed by Owner"
            /> */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="isListedByOwner"
                name="isListedByOwner"
                checked={form.isListedByOwner || false} // Default to false if undefined
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: 'isListedByOwner',
                      value: e.target.checked,
                    },
                  })
                }
              />
              <label className="form-check-label" htmlFor="isListedByOwner">
                Is Listed by Owner
              </label>
            </div>

            <InputField
              id="preferredContactMethod"
              name="preferredContactMethod"
              type="text"
              value={form.preferredContactMethod}
              error={error.preferredContactMethod}
              onChange={handleChange}
              label="Preferred Contact Method"
            />
            <AddImage
              error={error}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              handleFileUpload={handleFileUpload}
              handleChange={handleChange}
              setFile={setFile}
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
