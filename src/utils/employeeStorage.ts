import type { Employee } from '@/types/Employee';
import { isEmployee } from './employeeGuards';

const STORAGE_KEY = 'employees';

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

export function saveEmployeesToStorage(employees: Employee[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    return true;
  } catch {
    return false;
  }
}
