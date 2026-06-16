import type { Employee } from '../types/Employee';
import sampleData from './employees.sample.json';

export function loadSampleEmployees(): Employee[] {
  return sampleData as Employee[];
}
