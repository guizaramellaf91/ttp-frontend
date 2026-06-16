import type { Employee } from '../types/Employee';
import sampleData from './employees.sample.json';

interface SampleEmployee {
  name: string;
  cpf: string;
  grossSalary: number;
  socialSecurityDiscount: number;
  dependents: number;
}

export function loadSampleEmployees(): Employee[] {
  return (sampleData as SampleEmployee[]).map((item) => ({
    ...item,
    id: crypto.randomUUID(),
  }));
}
