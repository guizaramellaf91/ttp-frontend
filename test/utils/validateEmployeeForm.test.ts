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

const validData = {
  name: 'Maria Santos',
  cpf: '390.533.447-05',
  grossSalary: '3.000,00',
  socialSecurityDiscount: '200,00',
  dependents: '1',
};

describe('validateEmployeeForm', () => {
  it('retorna erro quando nome está vazio', () => {
    const errors = validateEmployeeForm({
      data: { ...validData, name: '  ' },
      employees,
    });

    expect(errors.name).toBe('Nome é obrigatório');
  });

  it('retorna erro quando CPF é inválido', () => {
    const errors = validateEmployeeForm({
      data: { ...validData, cpf: '111.111.111-11' },
      employees,
    });

    expect(errors.cpf).toBe('CPF inválido');
  });

  it('retorna erro quando CPF já está cadastrado', () => {
    const errors = validateEmployeeForm({
      data: { ...validData, cpf: '529.982.247-25' },
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

  it('retorna erro quando salário bruto é zero', () => {
    const errors = validateEmployeeForm({
      data: { ...validData, grossSalary: '0,00' },
      employees,
    });

    expect(errors.grossSalary).toBe('Salário bruto deve ser maior que zero');
  });

  it('retorna erro quando desconto previdência excede salário', () => {
    const errors = validateEmployeeForm({
      data: { ...validData, socialSecurityDiscount: '5.000,00' },
      employees,
    });

    expect(errors.socialSecurityDiscount).toBe(
      'Desconto não pode ser maior que o salário'
    );
  });
});
