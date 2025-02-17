import { useState } from 'react';
import InputField from '../components/form/InputField';
import Select from '../components/form/Select';

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
    sde: '',
    inventory: '',
    revenue: '',
    category: '',
    businessAge: '',
    repeatCustomers: '',
    employees: '',
  });
  const [valuation, setValuation] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === 'number'
          ? parseFloat(e.target.value) || ''
          : e.target.value,
    });
  };

  const calculateValuation = () => {
    if (!formData.category) {
      setCategoryError('Please select a category');
      return;
    }
    setCategoryError(null);

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

        <form className="space-y-4">
          {[
            'sde',
            'inventory',
            'revenue',
            'businessAge',
            'repeatCustomers',
            'employees',
          ].map((field) => (
            <InputField
              key={field}
              id={field}
              name={field}
              type="number"
              min={0}
              label={field
                .replace(/([A-Z])/g, ' $1')
                .trim()
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
              placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim()}`}
              value={formData[field]}
              onChange={handleChange}
            />
          ))}

          <Select
            id="category"
            label="Category"
            value={formData.category}
            options={Object.keys(categoryMultiples)}
            onChange={handleChange}
            error={categoryError}
            required
          />

          <button
            type="button"
            onClick={calculateValuation}
            className="mt-4 w-full cursor-pointer rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
          >
            Calculate Valuation
          </button>
        </form>

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
