import PropTypes from 'prop-types';
import useBusinessForm from '../../hooks/useBusinessForm';
import Spinner from '../../components/common/Spinner';
import FormSection from '../form/FormSection';
import InputField from '../form/InputField';
import Dropdown from '../form/Dropdown';
import Checkbox from '../form/Checkbox';
import RadioGroup from '../form/RadioGroup';
import AddImage from './AddImage';
import categories from '../../constants/categories';

const BusinessForm = ({ id = '' }) => {
  const {
    form,
    error,
    imageSrc,
    isLoading,
    setFile,
    setImageSrc,
    handleFileUpload,
    handleChange,
    handleSubmit,
  } = useBusinessForm(id);

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg"
    >
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Business Information
      </h2>

      <FormSection title="Basic Info">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="name"
            name="name"
            type="text"
            label="Business Name"
            value={form.name}
            error={error.name}
            onChange={handleChange}
            required
          />
          <InputField
            id="description"
            name="description"
            type="text"
            label="Description"
            value={form.description}
            error={error.description}
            onChange={handleChange}
            required
          />
          <Dropdown
            id="category"
            label="Category"
            value={form.category}
            options={categories}
            onChange={handleChange}
            error={error.category}
            required
          />
        </div>
      </FormSection>

      <FormSection title="Financial Info">
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
            required
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
            required
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
      </FormSection>

      <FormSection title="Location">
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
            required
          />
          <InputField
            id="state"
            name="state"
            type="text"
            label="State"
            value={form.state}
            error={error.state}
            onChange={handleChange}
            required
          />
          <InputField
            id="zipCode"
            name="zipCode"
            type="text"
            label="ZIP Code"
            value={form.zipCode}
            error={error.zipCode}
            onChange={handleChange}
            required
          />
        </div>
      </FormSection>

      <FormSection title="Contact Details">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="ownerName"
            name="ownerName"
            type="text"
            label="Owner Name"
            value={form.ownerName}
            error={error.ownerName}
            onChange={handleChange}
            required
          />
          <InputField
            id="contactEmail"
            name="contactEmail"
            type="email"
            label="Contact Email"
            value={form.contactEmail}
            error={error.contactEmail}
            onChange={handleChange}
            required
          />
          <RadioGroup
            id="preferredContactMethod"
            label="Preferred Contact Method"
            options={['phone', 'email']}
            value={form.preferredContactMethod}
            onChange={handleChange}
            error={error.preferredContactMethod}
            required
          />
        </div>
      </FormSection>

      <FormSection title="Additional Info">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="yearEstablished"
            name="yearEstablished"
            type="number"
            min={0}
            max={new Date().getFullYear()}
            label="Year Established"
            value={form.yearEstablished}
            error={error.yearEstablished}
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
            required
          />
          <Checkbox
            id="isListedByOwner"
            name="isListedByOwner"
            label="Is Listed by Owner"
            checked={form.isListedByOwner}
            onChange={handleChange}
          />
        </div>
      </FormSection>

      <FormSection>
        <AddImage
          error={error}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          handleFileUpload={handleFileUpload}
          setFile={setFile}
        />
      </FormSection>

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Save
        </button>
      </div>

      {error.form && (
        <p className="mt-3 text-center text-red-600">{error.form}</p>
      )}
      {isLoading && <Spinner />}
    </form>
  );
};

BusinessForm.propTypes = {
  id: PropTypes.string,
};

export default BusinessForm;
