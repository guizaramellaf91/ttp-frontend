export interface Employee {
  id: string;
  name: string;
  cpf: string;
  grossSalary: number;
  socialSecurityDiscount: number;
  dependents: number;
}

export interface EmployeeFormData {
  name: string;
  cpf: string;
  grossSalary: string;
  socialSecurityDiscount: string;
  dependents: string;
}

export interface EmployeeTaxInfo {
  baseSalaryIR: number;
  irrfDiscount: number;
}

export interface EmployeeWithTax extends Employee, EmployeeTaxInfo {}

export type FormErrors = Partial<Record<keyof EmployeeFormData, string>>;

export interface SearchFilters {
  name: string;
  cpf: string;
}
