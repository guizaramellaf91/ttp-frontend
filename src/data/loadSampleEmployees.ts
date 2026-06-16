import type { Employee } from '@/types/Employee';
import { isEmployee } from '@/utils/employeeGuards';
import sampleData from './employees.sample.json';

export function loadSampleEmployees(): Employee[] {
  if (!Array.isArray(sampleData)) return [];

  return sampleData.filter(isEmployee);
}
