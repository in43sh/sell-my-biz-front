import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { inputFields } from '../constants/evaluateFormFieldsData';
import GradientLayout from '../components/layouts/GradientLayout';
import InputField from '../components/form/InputField';
import Select from '../components/form/Select';

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

  // Initialize form state (all fields start as empty strings; "0" is allowed when entered)
  const initialState = inputFields.reduce(
    (acc, field) => {
      acc[field.name] = '';
      return acc;
    },
    { industry: '' }
  );

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
    const {
      sde,
      inventory,
      industry,
      revenue,
      businessAge,
      repeatCustomers,
      employees,
    } = formData;
    const industryMultiplier =
      INDUSTRY_MULTIPLIERS[industry] || INDUSTRY_MULTIPLIERS.Other;
    const baseValuation = sde * industryMultiplier;

    // --- Risk Multipliers Calculation ---

    // 1. Age Multiplier:
    //    < 3 years → 0.45, 3–5 years → 0.75, 5–10 years → 0.9, 10+ years → 1.1
    let ageMultiplier = 1.0;
    if (businessAge < 3) {
      ageMultiplier = 0.45;
    } else if (businessAge < 5) {
      ageMultiplier = 0.75;
    } else if (businessAge < 10) {
      ageMultiplier = 0.9;
    } else {
      ageMultiplier = 1.1;
    }

    // 2. Repeat Business Multiplier:
    //    Fewer than 30 repeat customers → 0.65, otherwise → 1.0
    const repeatMultiplier = repeatCustomers < 30 ? 0.65 : 1.0;

    // 3. Employee Multiplier:
    //    If fewer than 3 employees and business is under 3 years → 0.4,
    //    if fewer than 3 employees (but 3+ years) → 0.8,
    //    otherwise → 1.0
    let employeeMultiplier = 1.0;
    if (employees < 3) {
      employeeMultiplier = businessAge < 3 ? 0.4 : 0.8;
    } else {
      employeeMultiplier = 1.0;
    }

    // Apply the risk multipliers to the base valuation.
    const adjustedValuation =
      baseValuation * ageMultiplier * repeatMultiplier * employeeMultiplier;

    // Revenue adds an additive contribution (30% of revenue).
    const revenueContribution = revenue * 0.3;

    // Final valuation = Adjusted base valuation + Inventory + Revenue contribution.
    const finalValuation = adjustedValuation + inventory + revenueContribution;

    setResult(finalValuation);
    setDetails({
      sde,
      inventory,
      industry,
      industryMultiplier,
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
    <GradientLayout>
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-3xl font-semibold text-gray-900">
          Business Valuation Calculator
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {inputFields.map(({ name, label, min, exampleValue }) => (
            <InputField
              key={name}
              id={name}
              name={name}
              type="text" // using "text" to prevent native number spinners
              min={min}
              inputMode="numeric" // brings up a numeric keyboard on mobile
              pattern="[0-9]*" // restricts input to numbers only
              label={label}
              // placeholder={`Enter ${label}. ${exampleValue}`}
              placeholder={`e.g., ${exampleValue}`}
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
    </GradientLayout>
  );
};

export default BusinessEvaluate;
