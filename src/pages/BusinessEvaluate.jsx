import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

const FormulaCalculator = () => {
  const { isLoggedIn } = useAuth();
  console.log('isLoggedIn ===> ', isLoggedIn);

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
    const ageFactor = Math.min(parseInt(businessAge), 20) * 0.02; // Max +20% for 20+ years
    const repeatCustomerFactor = parseFloat(repeatCustomers) * 0.01; // 1% per repeat customer rate
    const revenueFactor = parseFloat(grossRevenue) * 0.3; // 30% of gross revenue

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
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Business Valuation Calculator</h2>
      <form onSubmit={handleSubmit} className="bg-light border p-4 shadow-sm">
        <div className="mb-3">
          <label htmlFor="profit" className="form-label">
            Profit A Year:
          </label>
          <input
            type="number"
            className="form-control"
            id="profit"
            name="profit"
            value={formData.profit}
            onChange={handleChange}
            placeholder="Enter Profit (e.g., 150000)"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inventory" className="form-label">
            Inventory Value:
          </label>
          <input
            type="number"
            className="form-control"
            id="inventory"
            name="inventory"
            value={formData.inventory}
            onChange={handleChange}
            placeholder="Enter Inventory Value (e.g., 20000)"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="grossRevenue" className="form-label">
            Gross Revenue:
          </label>
          <input
            type="number"
            className="form-control"
            id="grossRevenue"
            name="grossRevenue"
            value={formData.grossRevenue}
            onChange={handleChange}
            placeholder="Enter Gross Revenue (e.g., 500000)"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="businessAge" className="form-label">
            Business Age (Years):
          </label>
          <input
            type="number"
            className="form-control"
            id="businessAge"
            name="businessAge"
            value={formData.businessAge}
            onChange={handleChange}
            placeholder="Enter Business Age (e.g., 10)"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="repeatCustomers" className="form-label">
            Repeat Customers (%):
          </label>
          <input
            type="number"
            className="form-control"
            id="repeatCustomers"
            name="repeatCustomers"
            value={formData.repeatCustomers}
            onChange={handleChange}
            placeholder="Enter Repeat Customer Rate (e.g., 80)"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="industry" className="form-label">
            Industry:
          </label>
          <select
            className="form-select"
            id="industry"
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
        <button type="submit" className="btn btn-primary w-100">
          Calculate Valuation
        </button>
      </form>

      {result !== null && (
        <div className="bg-light mt-5 border p-4 shadow-sm">
          <h4>Valuation Result</h4>
          <p>
            <strong>Estimated Valuation:</strong> ${result.toLocaleString()}
          </p>
          <h5>Breakdown</h5>
          <ul>
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
            className="btn btn-success mt-3"
            onClick={handleCreateListing}
          >
            Create Listing
          </button>
        </div>
      )}
    </div>
  );
};

export default FormulaCalculator;
