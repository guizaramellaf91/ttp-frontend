import type { Employee, EmployeeFormData } from '@/types/Employee';

export type FormErrors = Partial<Record<keyof EmployeeFormData, string>>;

export function isEmployee(value: unknown): value is Employee {
  if (!value || typeof value !== 'object') return false;

  const employee = value as Record<string, unknown>;

  return (
    typeof employee.id === 'string' &&
    typeof employee.name === 'string' &&
    typeof employee.cpf === 'string' &&
    typeof employee.grossSalary === 'number' &&
    typeof employee.socialSecurityDiscount === 'number' &&
    typeof employee.dependents === 'number' &&
    employee.dependents >= 0
  );
}
