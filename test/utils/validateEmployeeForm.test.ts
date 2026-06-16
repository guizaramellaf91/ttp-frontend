import { describe, it, expect } from 'vitest';
import type { Employee } from '@/types/Employee';
import { validateEmployeeForm } from '@/utils/validateEmployeeForm';

const employees: Employee[] = [
  {
    id: '1',
    name: 'João Silva',
    cpf: '52998224725',
    grossSalary: 2000,
    socialSecurityDiscount: 150,
    dependents: 0,
  },
];

describe('validateEmployeeForm', () => {
  it('retorna erro quando CPF já está cadastrado', () => {
    const errors = validateEmployeeForm({
      data: {
        name: 'Outro Nome',
        cpf: '529.982.247-25',
        grossSalary: '3.000,00',
        socialSecurityDiscount: '200,00',
        dependents: '0',
      },
      employees,
    });

    expect(errors.cpf).toBe('CPF já cadastrado');
  });

  it('permite o mesmo CPF ao editar o próprio funcionário', () => {
    const errors = validateEmployeeForm({
      data: {
        name: 'João Silva',
        cpf: '529.982.247-25',
        grossSalary: '2.000,00',
        socialSecurityDiscount: '150,00',
        dependents: '0',
      },
      employees,
      editingEmployeeId: '1',
    });

    expect(errors.cpf).toBeUndefined();
  });
});
