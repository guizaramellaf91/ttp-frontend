import type { EmployeeTaxInfo } from '@/types/Employee';

const DEPENDENT_DEDUCTION = 189.59;

const IRRF_BRACKETS = [
  { min: 0, max: 2259.2, rate: 0, deduction: 0 },
  { min: 2259.21, max: 2826.65, rate: 0.075, deduction: 169.44 },
  { min: 2826.66, max: 3751.05, rate: 0.15, deduction: 381.44 },
  { min: 3751.06, max: 4664.68, rate: 0.225, deduction: 662.77 },
  { min: 4664.69, max: Infinity, rate: 0.275, deduction: 896.0 },
] as const;

export function calculateIRRF(
  grossSalary: number,
  socialSecurityDiscount: number,
  dependents: number
): EmployeeTaxInfo {
  const baseSalaryIR = Math.max(
    0,
    grossSalary - socialSecurityDiscount - dependents * DEPENDENT_DEDUCTION
  );

  const bracket = IRRF_BRACKETS.find(
    (b) => baseSalaryIR >= b.min && baseSalaryIR <= b.max
  );

  if (!bracket || bracket.rate === 0) {
    return { baseSalaryIR, irrfDiscount: 0 };
  }

  const irrfDiscount = Math.max(0, baseSalaryIR * bracket.rate - bracket.deduction);

  return {
    baseSalaryIR,
    irrfDiscount: Math.round(irrfDiscount * 100) / 100,
  };
}
