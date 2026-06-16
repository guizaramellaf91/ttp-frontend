import type { Employee } from '../types/Employee';

const STORAGE_KEY = 'employees';

function isEmployee(value: unknown): value is Employee {
  if (!value || typeof value !== 'object') return false;

  const employee = value as Record<string, unknown>;

  return (
    typeof employee.id === 'string' &&
    typeof employee.name === 'string' &&
    typeof employee.cpf === 'string' &&
    typeof employee.grossSalary === 'number' &&
    typeof employee.socialSecurityDiscount === 'number' &&
    typeof employee.dependents === 'number'
  );
}

export function loadEmployeesFromStorage(): Employee[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isEmployee);
  } catch {
    return [];
  }
}

export function saveEmployeesToStorage(employees: Employee[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}
