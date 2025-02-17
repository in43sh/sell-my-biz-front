import { useState } from 'react';
import InputField from '../components/form/InputField';
import Select from '../components/form/Select';
import inputFields from '../constants/evaluateFormFieldsData';

const categoryMultiples = {
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

export default function BusinessValuation() {
  const [formData, setFormData] = useState({
    sde: 0,
    inventory: 0,
    revenue: 0,
    category: '',
    businessAge: 0,
    repeatCustomers: 0,
    employees: 0,
  });

  const [valuation, setValuation] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setError((prevError) => {
      const newError = { ...prevError };
      delete newError[name];
      return newError;
    });
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const calculateValuation = (e) => {
    e.preventDefault();

    setError(null);

    let baseMultiple = categoryMultiples[formData.category] || 2.0;
    let estimatedValue =
      formData.sde * baseMultiple +
      0.3 * formData.revenue +
      parseFloat(formData.inventory || 0);

    setValuation(estimatedValue);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6 text-blue-900">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-semibold text-blue-700">
          Business Valuation Estimator
        </h2>

        <form onSubmit={calculateValuation} className="space-y-4">
          {inputFields.map(({ name, label, type, min }) => (
            <InputField
              key={name}
              id={name}
              name={name}
              type={type}
              min={min}
              label={label}
              placeholder={`Enter ${label}`}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          ))}

          <Select
            id="category"
            label="Category"
            value={formData.category}
            options={Object.keys(categoryMultiples)}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="mt-4 w-full cursor-pointer rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
          >
            Calculate Valuation
          </button>
        </form>

        {error && (
          <div className="mt-4 text-sm font-semibold text-red-600">{error}</div>
        )}

        {valuation !== null && (
          <div className="mt-6 rounded-lg bg-gray-100 p-6 shadow-md">
            <h4 className="text-xl font-semibold">Estimated Valuation:</h4>
            <p className="mt-2 text-lg font-bold text-blue-700">
              ${valuation.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
