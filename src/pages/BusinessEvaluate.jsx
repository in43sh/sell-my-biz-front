import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import InputField from '../components/form/InputField';
import Select from '../components/form/Select';
import inputFields from '../constants/evaluateFormFieldsData';

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

  // Initialize form state with empty strings (0 is allowed once entered)
  const initialState = inputFields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, { industry: '' });

  const [formData, setFormData] = useState(initialState);
  const [result, setResult] = useState(null);
  const [details, setDetails] = useState(null);

  // Handle changes while allowing "0" as a valid numeric input.
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevForm) => ({
      ...prevForm,
      [name]:
        name === 'industry'
          ? value
          : value === '' // keep empty string if field is cleared
          ? ''
          : Number(value), // convert value to number (0 remains 0)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that no field is left empty (0 is acceptable)
    if (Object.values(formData).some((val) => val === '')) {
      alert('Please provide all required fields.');
      return;
    }

    // Destructure inputs; numeric fields are already numbers (0 allowed)
    const { sde, inventory, industry, revenue, businessAge, repeatCustomers, employees } = formData;
    const multiple = INDUSTRY_MULTIPLIERS[industry] || INDUSTRY_MULTIPLIERS.Other;
    const baseValuation = sde * multiple;

    // --- Revised Multipliers Based on Risk Factors ---
    
    // 1. Age Multiplier:
    let ageMultiplier = 1.0;
    if (businessAge < 3) {
      ageMultiplier = 0.45; // even steeper penalty for very young businesses
    } else if (businessAge < 5) {
      ageMultiplier = 0.75;
    } else if (businessAge < 10) {
      ageMultiplier = 0.9;
    } else {
      ageMultiplier = 1.1;
    }

    // 2. Repeat Business Multiplier:
    let repeatMultiplier = 1.0;
    if (repeatCustomers < 30) {
      repeatMultiplier = 0.65;
    } else {
      repeatMultiplier = 1.0;
    }

    // 3. Employee Multiplier:
    let employeeMultiplier = 1.0;
    if (employees < 3) {
      if (businessAge < 3) {
        employeeMultiplier = 0.4; // extremely low for very young businesses with few employees
      } else {
        employeeMultiplier = 0.8;
      }
    } else {
      employeeMultiplier = 1.0;
    }

    // Calculate the adjusted base valuation using the risk multipliers.
    const adjustedValuation = baseValuation * ageMultiplier * repeatMultiplier * employeeMultiplier;

    // Revenue adds a direct contribution (30% of revenue).
    const revenueContribution = revenue * 0.3;

    // Final valuation = adjusted base + inventory + revenue contribution.
    const finalValuation = adjustedValuation + inventory + revenueContribution;

    setResult(finalValuation);
    setDetails({
      sde,
      inventory,
      industry,
      industryMultiple: multiple,
      revenue,
      businessAge,
      repeatCustomers,
      employees,
      ageMultiplier,
      repeatMultiplier,
      employeeMultiplier,
      revenueContribution,
      baseValuation,
      adjustedValuation,
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
          {inputFields.map(({ name, label, min }) => (
            <InputField
              key={name}
              id={name}
              name={name}
              type="text" // using "text" to prevent native number spinners
              min={min}
              inputMode="numeric" // brings up a numeric keyboard on mobile
              pattern="[0-9]*"   // restricts input to numbers only
              label={label}
              placeholder={`Enter ${label}`}
              value={formData[name] === '' ? '' : formData[name]}
              onChange={handleChange}
              required
            />
          ))}

          <Select
            id="industry"
            label="Industry"
            value={formData.industry}
            options={Object.keys(INDUSTRY_MULTIPLIERS)}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
          >
            Calculate Valuation
          </button>
        </form>

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
