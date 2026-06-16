import type { Employee, EmployeeFormData } from '@/types/Employee';
import { formatCPF } from './formatters';

export function createEmptyForm(): EmployeeFormData {
  return {
    name: '',
    cpf: '',
    grossSalary: '',
    socialSecurityDiscount: '',
    dependents: '0',
  };
}

export function createFormFromEmployee(employee: Employee): EmployeeFormData {
  const currencyOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  } as const;

  return {
    name: employee.name,
    cpf: formatCPF(employee.cpf),
    grossSalary: employee.grossSalary.toLocaleString('pt-BR', currencyOptions),
    socialSecurityDiscount: employee.socialSecurityDiscount.toLocaleString(
      'pt-BR',
      currencyOptions
    ),
    dependents: String(employee.dependents),
  };
}
