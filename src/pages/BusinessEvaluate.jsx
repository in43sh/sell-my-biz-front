import { useState } from 'react';

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
  const [sde, setSde] = useState('');
  const [inventory, setInventory] = useState('');
  const [revenue, setRevenue] = useState('');
  const [category, setCategory] = useState('');
  const [businessAge, setBusinessAge] = useState('');
  const [repeatCustomers, setRepeatCustomers] = useState('');
  const [employees, setEmployees] = useState('');
  const [valuation, setValuation] = useState(null);

  const calculateValuation = () => {
    let estimatedValue = 0;

    if (employees === 0) {
      if (businessAge === 0) {
        estimatedValue = 0;
      } else if (businessAge < 2) {
        estimatedValue =
          0.15 * (revenue + parseFloat(inventory || 0)) + 0.5 * sde;
      } else if (businessAge < 5) {
        estimatedValue =
          0.2 * (revenue + parseFloat(inventory || 0)) + 0.75 * sde;
      } else {
        estimatedValue = 0.25 * (revenue + parseFloat(inventory || 0)) + sde;
      }
    } else {
      let baseMultiple = categoryMultiples[category] || 2.0;
      let repeatCustomerMultiplier = 1.0;
      if (repeatCustomers >= 50) repeatCustomerMultiplier = 1.4;
      else if (repeatCustomers >= 30) repeatCustomerMultiplier = 1.3;
      else if (repeatCustomers >= 10) repeatCustomerMultiplier = 1.2;

      let ageMultiplier = businessAge >= 5 ? 1.1 : 1.0;
      let employeeMultiplier =
        employees > 10
          ? 1.2
          : employees > 5
            ? 1.1
            : employees === 1
              ? 0.8
              : 1.0;

      let riskMultiplier = 1.0;
      if (businessAge === 0) riskMultiplier = 0.3;
      else if (businessAge < 2 && employees === 1) riskMultiplier = 0.5;
      else if (businessAge < 2 && employees <= 3) riskMultiplier = 0.65;
      else if (businessAge < 5 && employees === 1) riskMultiplier = 0.6;
      else if (businessAge < 5 && employees <= 3) riskMultiplier = 0.75;
      else if (businessAge === 5 && employees === 1) riskMultiplier = 0.7;

      estimatedValue =
        (sde * baseMultiple + 0.3 * revenue + parseFloat(inventory || 0)) *
        ageMultiplier *
        employeeMultiplier *
        riskMultiplier;
    }

    setValuation(estimatedValue);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-blue-100 p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-semibold text-blue-700">
          Business Valuation Estimator
        </h2>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-blue-600">
              Profit:
            </label>
            <input
              type="number"
              value={sde}
              onChange={(e) => setSde(parseFloat(e.target.value) || '')}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Profit (e.g., 150000)"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-blue-600">
              Inventory Value:
            </label>
            <input
              type="number"
              value={inventory}
              onChange={(e) => setInventory(parseFloat(e.target.value) || '')}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Inventory Value (e.g., 20000)"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-blue-600">
              Revenue:
            </label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(parseFloat(e.target.value) || '')}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Gross Revenue (e.g., 500000)"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-blue-600">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Category</option>
              {Object.keys(categoryMultiples).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-blue-600">
              Business Age (Years):
            </label>
            <input
              type="number"
              value={businessAge}
              onChange={(e) => setBusinessAge(parseFloat(e.target.value) || '')}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Business Age (e.g., 10)"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-blue-600">
              Repeat Customers (%):
            </label>
            <input
              type="number"
              value={repeatCustomers}
              onChange={(e) =>
                setRepeatCustomers(parseFloat(e.target.value) || '')
              }
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Repeat Customer Rate (e.g., 80)"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-blue-600">
              Number of Employees:
            </label>
            <input
              type="number"
              value={employees}
              onChange={(e) => setEmployees(parseFloat(e.target.value) || '')}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Number of Employees (e.g., 5)"
            />
          </div>

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
