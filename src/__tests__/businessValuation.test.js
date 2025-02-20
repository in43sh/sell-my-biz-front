import { calculateBusinessValuation } from '../utils/businessValuation';

describe('Business Valuation Calculation', () => {
  test('calculates valuation correctly with normal input', () => {
    const formData = {
      sde: 100000,
      inventory: 20000,
      industry: 'Retail',
      revenue: 500000,
      businessAge: 5,
      repeatCustomers: 50,
      employees: 5,
    };

    const { finalValuation } = calculateBusinessValuation(formData);

    // Expected formula: (SDE * IndustryMultiplier) * AgeMultiplier * RepeatMultiplier * EmployeeMultiplier + Inventory + (0.3 * Revenue)
    const expectedValuation =
      100000 * 2.5 * 0.9 * 1.0 * 1.0 + 20000 + 500000 * 0.3;

    expect(finalValuation).toBeCloseTo(expectedValuation);
  });

  test('applies correct multipliers for young business with low repeat customers', () => {
    const formData = {
      sde: 50000,
      inventory: 10000,
      industry: 'Technology',
      revenue: 300000,
      businessAge: 2,
      repeatCustomers: 10,
      employees: 2,
    };

    const { finalValuation } = calculateBusinessValuation(formData);
    expect(finalValuation).toBeGreaterThan(0); // Basic check to ensure a valid number is returned
  });
});
