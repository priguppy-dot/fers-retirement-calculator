export const FERS_BONUS_MULTIPLIER = 0.011;
export const FERS_STANDARD_MULTIPLIER = 0.01;
export const TSP_WITHDRAWAL_RATE = 0.04;

export type RetirementInputs = {
  currentAge: number;
  plannedRetirementAge: number;
  yearsOfService: number;
  high3Salary: number;
  currentTspBalance: number;
  monthlyTspContribution: number;
  expectedAnnualReturn: number;
};

export type RetirementResult = {
  yearsUntilRetirement: number;
  pensionMultiplier: number;
  annualFersPension: number;
  monthlyFersPension: number;
  projectedTsp: number;
  annualTspIncome: number;
  monthlyTspIncome: number;
  totalMonthlyIncome: number;
};

export const DEFAULT_INPUTS: RetirementInputs = {
  currentAge: 45,
  plannedRetirementAge: 62,
  yearsOfService: 30,
  high3Salary: 100_000,
  currentTspBalance: 250_000,
  monthlyTspContribution: 1_000,
  expectedAnnualReturn: 6,
};

export function projectTspBalance(
  currentBalance: number,
  monthlyContribution: number,
  annualReturnRate: number,
  yearsUntilRetirement: number,
): number {
  const months = yearsUntilRetirement * 12;
  if (months <= 0) return currentBalance;

  const monthlyRate = annualReturnRate / 1200;
  if (monthlyRate === 0) {
    return currentBalance + monthlyContribution * months;
  }

  const growth = (1 + monthlyRate) ** months;
  return currentBalance * growth + (monthlyContribution * (growth - 1)) / monthlyRate;
}

export function calculateRetirement(inputs: RetirementInputs): RetirementResult {
  const yearsUntilRetirement = Math.max(
    0,
    inputs.plannedRetirementAge - inputs.currentAge,
  );
  const pensionMultiplier =
    inputs.plannedRetirementAge >= 62 && inputs.yearsOfService >= 20
      ? FERS_BONUS_MULTIPLIER
      : FERS_STANDARD_MULTIPLIER;

  const annualFersPension =
    pensionMultiplier * inputs.high3Salary * inputs.yearsOfService;
  const monthlyFersPension = annualFersPension / 12;

  const projectedTsp = projectTspBalance(
    inputs.currentTspBalance,
    inputs.monthlyTspContribution,
    inputs.expectedAnnualReturn,
    yearsUntilRetirement,
  );
  const annualTspIncome = projectedTsp * TSP_WITHDRAWAL_RATE;
  const monthlyTspIncome = annualTspIncome / 12;

  return {
    yearsUntilRetirement,
    pensionMultiplier,
    annualFersPension,
    monthlyFersPension,
    projectedTsp,
    annualTspIncome,
    monthlyTspIncome,
    totalMonthlyIncome: monthlyFersPension + monthlyTspIncome,
  };
}

export function isValidInputs(inputs: RetirementInputs): boolean {
  return inputs.plannedRetirementAge >= inputs.currentAge;
}
