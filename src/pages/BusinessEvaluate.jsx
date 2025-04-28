import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { calculateBusinessValuation } from '../utils/businessValuation';
import { INDUSTRY_MULTIPLIERS } from '../constants/industryMultipliers';
import { inputFields } from '../constants/evaluateFormFieldsData';
import GradientLayout from '../components/layouts/GradientLayout';
import InputField from '../components/form/InputField';
import Select from '../components/form/Select';

const BusinessEvaluate = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Initialize form state (all fields start as empty strings; "0" is allowed when entered)
  const initialState = inputFields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    { industry: '' }
  );

  const [formData, setFormData] = useState(initialState);
  const [result, setResult] = useState(null);
  const [details, setDetails] = useState(null);

  // Handle input changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'industry' ? value : value === '' ? '' : Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (Object.values(formData).some((val) => val === '')) {
      alert('Please provide all required fields.');
      return;
    }

    const { finalValuation, details } = calculateBusinessValuation(formData);
    setResult(finalValuation);
    setDetails(details);
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
              type="text"
              min={min}
              inputMode="numeric"
              pattern="[0-9]*"
              label={label}
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
