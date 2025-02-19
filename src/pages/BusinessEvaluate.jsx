import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import InputField from '../components/form/InputField';
import Select from '../components/form/Select';
import inputFields from '../constants/evaluateFormFieldsData'; // Import input fields dynamically

const INDUSTRY_MULTIPLIERS = {
  Retail: 2.5,
  'Food & Beverage': 2.2,
  'Health & Wellness': 2.8,
  Technology: 3.5,
  Manufacturing: 2.0,
  Services: 2.0,
  Education: 2.2,
  Entertainment: 2.5,
  Other: 1.8,
};

const BusinessEvaluate = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const initialState = inputFields.reduce((acc, field) => {
    acc[field.name] = ''; // Start with an empty string
    return acc;
  }, { industry: '' }); // Initialize industry as an empty string

  const [formData, setFormData] = useState(initialState);
  const [result, setResult] = useState(null);
  const [details, setDetails] = useState(null);

  // ✅ Fixed handleChange to properly handle `0`
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value === ''
        ? '' 
        : name === 'industry' 
        ? value
        : isNaN(value) 
        ? prevForm[name] 
        : Number(value), 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure required fields are filled but allow `0` values
    if (Object.values(formData).some((val) => val === '')) {
      alert('Please provide all required fields.');
      return;
    }

    const { sde, inventory, industry, revenue, businessAge, repeatCustomers, employees } = formData;

    const multiple = INDUSTRY_MULTIPLIERS[industry] || INDUSTRY_MULTIPLIERS.Other;
    const ageFactor = Math.min(parseInt(businessAge) || 0, 20) * 0.02;
    const repeatCustomerFactor = parseFloat(repeatCustomers) * 0.01;
    const revenueFactor = parseFloat(revenue) * 0.3;

    const valuation =
      parseFloat(sde) * multiple +
      parseFloat(inventory || 0) +
      revenueFactor +
      parseFloat(sde) * ageFactor +
      parseFloat(sde) * repeatCustomerFactor;

    setResult(valuation);
    setDetails({
      sde,
      inventory,
      industry,
      industryMultiple: multiple,
      revenue,
      businessAge,
      repeatCustomers,
      employees,
      ageFactor,
      repeatCustomerFactor,
      revenueFactor,
    });
  };

  const handleCreateListing = () => {
    if (!isLoggedIn) {
      alert('Please log in to create a listing.');
      return;
    }
    navigate('/account/add-business', { state: { result, details } });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">
          Business Valuation Calculator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Generate Inputs from `inputFields` */}
          {inputFields.map(({ name, label, type, min }) => (
            <InputField
              key={name}
              id={name}
              name={name}
              type={type}
              min={min}
              inputMode="numeric" // ✅ Removes the number input slider on mobile
              pattern="[0-9]*" // ✅ Prevents scrolling on number input
              label={label}
              placeholder={`Enter ${label}`}
              value={formData[name] === '' ? '' : formData[name]} 
              onChange={handleChange}
              required
            />
          ))}

          {/* Industry Dropdown */}
          <Select
            id="industry"
            label="Industry"
            value={formData.industry}
            options={Object.keys(INDUSTRY_MULTIPLIERS)}
            onChange={handleChange}
            required
          />


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
          >
            Calculate Valuation
          </button>
        </form>

        {/* Display Results */}
        {result !== null && (
          <div className="mt-6 rounded-lg bg-gray-100 p-6 shadow-md">
            <h4 className="text-xl font-semibold">Valuation Result</h4>
            <p className="mt-2 text-lg">
              <strong>Estimated Valuation:</strong> ${result.toLocaleString()}
            </p>
            <button
              className="mt-4 w-full cursor-pointer rounded-lg bg-green-600 py-3 font-semibold text-white transition duration-300 hover:bg-green-700"
              onClick={handleCreateListing}
            >
              Create Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessEvaluate;
