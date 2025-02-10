import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const BusinessEvaluate = () => {
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    profit: '',
    inventory: '',
    industry: '',
    grossRevenue: '',
    businessAge: '',
    repeatCustomers: '',
  });
  const [result, setResult] = useState(null);
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      profit,
      inventory,
      industry,
      grossRevenue,
      businessAge,
      repeatCustomers,
    } = formData;
    if (
      !profit ||
      !industry ||
      !grossRevenue ||
      !businessAge ||
      !repeatCustomers
    ) {
      alert('Please provide all required fields.');
      return;
    }

    const multiple =
      INDUSTRY_MULTIPLIERS[industry] || INDUSTRY_MULTIPLIERS.Other;
    const ageFactor = Math.min(parseInt(businessAge), 20) * 0.02;
    const repeatCustomerFactor = parseFloat(repeatCustomers) * 0.01;
    const revenueFactor = parseFloat(grossRevenue) * 0.3;

    const valuation =
      parseFloat(profit) * multiple +
      parseFloat(inventory || 0) +
      revenueFactor +
      parseFloat(profit) * ageFactor +
      parseFloat(profit) * repeatCustomerFactor;

    setResult(valuation);
    setDetails({
      profit,
      inventory,
      industry,
      industryMultiple: multiple,
      grossRevenue,
      businessAge,
      repeatCustomers,
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
          <div>
            <label className="mb-2 block text-sm font-medium">
              Profit (Yearly)
            </label>
            <input
              type="number"
              className="w-full rounded-lg border p-3"
              name="profit"
              value={formData.profit}
              onChange={handleChange}
              placeholder="Enter Profit (e.g., 150000)"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Inventory Value
            </label>
            <input
              type="number"
              className="w-full rounded-lg border p-3"
              name="inventory"
              value={formData.inventory}
              onChange={handleChange}
              placeholder="Enter Inventory Value (e.g., 20000)"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Gross Revenue
            </label>
            <input
              type="number"
              className="w-full rounded-lg border p-3"
              name="grossRevenue"
              value={formData.grossRevenue}
              onChange={handleChange}
              placeholder="Enter Gross Revenue (e.g., 500000)"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Business Age (Years)
            </label>
            <input
              type="number"
              className="w-full rounded-lg border p-3"
              name="businessAge"
              value={formData.businessAge}
              onChange={handleChange}
              placeholder="Enter Business Age (e.g., 10)"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Repeat Customers (%)
            </label>
            <input
              type="number"
              className="w-full rounded-lg border p-3"
              name="repeatCustomers"
              value={formData.repeatCustomers}
              onChange={handleChange}
              placeholder="Enter Repeat Customer Rate (e.g., 80)"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Industry</label>
            <select
              className="w-full rounded-lg border p-3"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            >
              <option value="">Select an Industry</option>
              {Object.keys(INDUSTRY_MULTIPLIERS).map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
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
            <h5 className="mt-4 text-lg font-semibold">Breakdown</h5>
            <ul className="mt-2 space-y-2">
              <li>
                <strong>Profit (SDE):</strong> $
                {parseFloat(details.profit).toLocaleString()}
              </li>
              <li>
                <strong>Gross Revenue Factor:</strong> $
                {details.revenueFactor.toLocaleString()}
              </li>
              <li>
                <strong>Business Age Factor:</strong> +
                {(details.ageFactor * 100).toFixed(1)}%
              </li>
              <li>
                <strong>Repeat Customers Factor:</strong> +
                {(details.repeatCustomerFactor * 100).toFixed(1)}%
              </li>
              <li>
                <strong>Industry:</strong> {details.industry}
              </li>
              <li>
                <strong>Industry Multiple:</strong> {details.industryMultiple}x
              </li>
              <li>
                <strong>Inventory Value:</strong> $
                {parseFloat(details.inventory || 0).toLocaleString()}
              </li>
            </ul>
            <button
              className="mt-4 w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition duration-300 hover:bg-green-700"
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
