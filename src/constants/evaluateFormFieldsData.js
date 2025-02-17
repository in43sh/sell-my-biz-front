const inputFields = [
  {
    name: 'sde',
    label: 'Seller’s Discretionary Earnings (SDE)',
    type: 'number',
    min: 0,
  },
  { name: 'inventory', label: 'Inventory Value', type: 'number', min: 0 },
  { name: 'revenue', label: 'Annual Revenue', type: 'number', min: 0 },
  {
    name: 'businessAge',
    label: 'Business Age (Years)',
    type: 'number',
    min: 0,
  },
  {
    name: 'repeatCustomers',
    label: 'Repeat Customers (%)',
    type: 'number',
    min: 0,
  },
  { name: 'employees', label: 'Number of Employees', type: 'number', min: 0 },
];

export default inputFields;
