import type { Employee, EmployeeFormData, FormErrors } from '../types/Employee';
import { isValidCPF, parseCurrency } from './formatters';

export interface ValidateEmployeeFormOptions {
  data: EmployeeFormData;
  employees: Employee[];
  editingEmployeeId?: string;
}

export function validateEmployeeForm({
  data,
  employees,
  editingEmployeeId,
}: ValidateEmployeeFormOptions): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Nome é obrigatório';
  }

  const cpfDigits = data.cpf.replace(/\D/g, '');

  if (!data.cpf.trim()) {
    errors.cpf = 'CPF é obrigatório';
  } else if (!isValidCPF(data.cpf)) {
    errors.cpf = 'CPF inválido';
  } else {
    const isDuplicate = employees.some(
      (employee) =>
        employee.cpf.replace(/\D/g, '') === cpfDigits &&
        employee.id !== editingEmployeeId
    );

    if (isDuplicate) {
      errors.cpf = 'CPF já cadastrado';
    }
  }

  const grossSalary = parseCurrency(data.grossSalary);
  if (!data.grossSalary || grossSalary <= 0) {
    errors.grossSalary = 'Salário bruto deve ser maior que zero';
  }

  const socialSecurity = parseCurrency(data.socialSecurityDiscount);
  if (socialSecurity < 0) {
    errors.socialSecurityDiscount = 'Desconto não pode ser negativo';
  } else if (socialSecurity > grossSalary) {
    errors.socialSecurityDiscount = 'Desconto não pode ser maior que o salário';
  }

  const dependents = parseInt(data.dependents, 10);
  if (isNaN(dependents) || dependents < 0) {
    errors.dependents = 'Número de dependentes inválido';
  } else if (dependents > 99) {
    errors.dependents = 'Número de dependentes não pode exceder 99';
  }

  return errors;
}
