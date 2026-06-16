import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  loadEmployeesFromStorage,
  saveEmployeesToStorage,
} from '@/utils/employeeStorage';

describe('employeeStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('retorna array vazio quando não há dados salvos', () => {
    expect(loadEmployeesFromStorage()).toEqual([]);
  });

  it('ignora registros com formato inválido', () => {
    localStorage.setItem(
      'employees',
      JSON.stringify([
        { id: '1', name: 'Válido', cpf: '52998224725', grossSalary: 1000, socialSecurityDiscount: 0, dependents: 0 },
        { id: 2, name: 'Inválido' },
      ])
    );

    const result = loadEmployeesFromStorage();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Válido');
  });

  it('salva e carrega funcionários corretamente', () => {
    const employees = [
      {
        id: '1',
        name: 'João',
        cpf: '52998224725',
        grossSalary: 2000,
        socialSecurityDiscount: 150,
        dependents: 0,
      },
    ];

    expect(saveEmployeesToStorage(employees)).toBe(true);
    expect(loadEmployeesFromStorage()).toEqual(employees);
  });
});
