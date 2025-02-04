import { useEffect } from 'react';
import PropTypes from 'prop-types';
import useBusinessForm from '../../hooks/useBusinessForm';
import Spinner from '../../components/layouts/Spinner';
import InputField from '../Form/InputField';
import AddImage from './AddImage';
import categories from '../../constants/categories';

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
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-4xl rounded-md bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Business Information
      </h2>

      {/* --- BASIC INFO SECTION --- */}
      <section className="mb-8">
        <h3 className="mb-4 text-lg font-medium">Basic Info</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="name"
            name="name"
            type="text"
            label="Business Name"
            value={form.name}
            error={error.name}
            onChange={handleChange}
            tooltip="Use a clear, searchable name like 'Reliable HVAC Service'."
          />
          {/* If you want 'description' as a textarea, replace `InputField` with a custom component or <textarea> */}
          <InputField
            id="description"
            name="description"
            type="text"
            label="Description"
            value={form.description}
            error={error.description}
            onChange={handleChange}
          />
          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className={`w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none ${
                error.category ? 'border-red-500' : ''
              }`}
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {error.category && (
              <p className="mt-1 text-sm text-red-600">{error.category}</p>
            )}
          </div>
        </div>
      </section>

      {/* --- FINANCIAL INFO SECTION --- */}
      <section className="mb-8">
        <h3 className="mb-4 text-lg font-medium">Financial Info</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="price"
            name="price"
            type="number"
            min={0}
            step={0.01}
            label="Price"
            value={form.price}
            error={error.price}
            onChange={handleChange}
          />
          <InputField
            id="grossRevenue"
            name="grossRevenue"
            type="number"
            min={0}
            label="Gross Revenue"
            value={form.grossRevenue}
            error={error.grossRevenue}
            onChange={handleChange}
          />
          <InputField
            id="profit"
            name="profit"
            type="number"
            min={0}
            label="Profit"
            value={form.profit}
            error={error.profit}
            onChange={handleChange}
          />
          <InputField
            id="cashFlow"
            name="cashFlow"
            type="number"
            min={0}
            label="Cash Flow"
            value={form.cashFlow}
            error={error.cashFlow}
            onChange={handleChange}
          />
          <InputField
            id="inventoryValue"
            name="inventoryValue"
            type="number"
            min={0}
            label="Inventory Value"
            value={form.inventoryValue}
            error={error.inventoryValue}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* --- LOCATION SECTION --- */}
      <section className="mb-8">
        <h3 className="mb-4 text-lg font-medium">Location</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="address"
            name="address"
            type="text"
            label="Address"
            value={form.address}
            error={error.address}
            onChange={handleChange}
          />
          <InputField
            id="city"
            name="city"
            type="text"
            label="City"
            value={form.city}
            error={error.city}
            onChange={handleChange}
          />
          <InputField
            id="state"
            name="state"
            type="text"
            label="State"
            value={form.state}
            error={error.state}
            onChange={handleChange}
          />
          <InputField
            id="zipCode"
            name="zipCode"
            type="text"
            label="ZIP Code"
            value={form.zipCode}
            error={error.zipCode}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section className="mb-8">
        <h3 className="mb-4 text-lg font-medium">Contact Details</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="ownerName"
            name="ownerName"
            type="text"
            label="Owner Name"
            value={form.ownerName}
            error={error.ownerName}
            onChange={handleChange}
          />
          <InputField
            id="contactEmail"
            name="contactEmail"
            type="email"
            label="Contact Email"
            value={form.contactEmail}
            error={error.contactEmail}
            onChange={handleChange}
          />
          <InputField
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            label="Contact Phone Number"
            value={form.phoneNumber}
            error={error.phoneNumber}
            onChange={handleChange}
          />
          <InputField
            id="preferredContactMethod"
            name="preferredContactMethod"
            type="text"
            label="Preferred Contact Method"
            value={form.preferredContactMethod}
            error={error.preferredContactMethod}
            onChange={handleChange}
          />
        </div>
      </section>

      {/* --- ADDITIONAL SECTION --- */}
      <section className="mb-8">
        <h3 className="mb-4 text-lg font-medium">Additional Info</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="yearsEstablished"
            name="yearsEstablished"
            type="number"
            min={0}
            max={new Date().getFullYear()}
            label="Years Established"
            value={form.yearsEstablished}
            error={error.yearsEstablished}
            onChange={handleChange}
          />
          <InputField
            id="employees"
            name="employees"
            type="number"
            min={0}
            label="Number of Employees"
            value={form.employees}
            error={error.employees}
            onChange={handleChange}
          />
          <InputField
            id="reasonForSelling"
            name="reasonForSelling"
            type="text"
            label="Reason for Selling"
            value={form.reasonForSelling}
            error={error.reasonForSelling}
            onChange={handleChange}
          />
          <div className="flex items-center">
            <input
              className="mr-2 h-5 w-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-600"
              type="checkbox"
              id="isListedByOwner"
              name="isListedByOwner"
              checked={form.isListedByOwner || false}
              onChange={(e) =>
                handleChange({
                  target: { name: 'isListedByOwner', value: e.target.checked },
                })
              }
            />
            <label
              htmlFor="isListedByOwner"
              className="text-sm font-medium text-gray-700"
            >
              Is Listed by Owner
            </label>
          </div>
        </div>
      </section>

      {/* --- COVER IMAGE SECTION --- */}
      <section className="mb-8">
        <AddImage
          error={error}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          handleFileUpload={handleFileUpload}
          setFile={setFile}
        />
      </section>

      {/* --- ACTION BUTTONS --- */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          type="button"
          className="rounded-md border border-gray-400 px-4 py-2 text-gray-700 transition duration-300 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-blue-700"
        >
          Save
        </button>
      </div>

      {/* --- ERROR & LOADING STATES --- */}
      {error.form && (
        <p className="mt-3 text-center text-red-600">{error.form}</p>
      )}
      {isLoading && <Spinner />}
    </form>
  );
};

BusinessForm.propTypes = {
  id: PropTypes.string,
  evaluationData: PropTypes.object,
};

export default BusinessForm;
