import { INDUSTRY_MULTIPLIERS } from '../constants/industryMultipliers';

export const calculateBusinessValuation = ({
  sde,
  inventory,
  industry,
  revenue,
  businessAge,
  repeatCustomers,
  employees,
}) => {
  const industryMultiplier =
    INDUSTRY_MULTIPLIERS[industry] || INDUSTRY_MULTIPLIERS.Other;
  const baseValuation = sde * industryMultiplier;

  // --- Risk Multipliers Calculation ---

  // 1. Age Multiplier:
  //    < 3 years → 0.45, 3–5 years → 0.75, 5–10 years → 0.9, 10+ years → 1.1
  const ageMultiplier =
    businessAge < 3
      ? 0.45
      : businessAge < 5
        ? 0.75
        : businessAge < 10
          ? 0.9
          : 1.1;

  // 2. Repeat Business Multiplier:
  //    Fewer than 30 repeat customers → 0.65, otherwise → 1.0
  const repeatMultiplier = repeatCustomers < 30 ? 0.65 : 1.0;

  // 3. Employee Multiplier:
  //    If fewer than 3 employees and business is under 3 years → 0.4,
  //    if fewer than 3 employees (but 3+ years) → 0.8,
  //    otherwise → 1.0
  const employeeMultiplier =
    employees < 3 ? (businessAge < 3 ? 0.4 : 0.8) : 1.0;

  // Apply the risk multipliers to the base valuation.
  const adjustedValuation =
    baseValuation * ageMultiplier * repeatMultiplier * employeeMultiplier;

  // Revenue adds an additive contribution (30% of revenue).
  const revenueContribution = revenue * 0.3;

  // Final valuation = Adjusted base valuation + Inventory + Revenue contribution.
  const finalValuation = adjustedValuation + inventory + revenueContribution;

  return {
    finalValuation,
    details: {
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
    },
  };
};
