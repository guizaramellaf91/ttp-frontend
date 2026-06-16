import { describe, it, expect } from 'vitest';
import { calculateIRRF } from '@/utils/calculateIRRF';

describe('calculateIRRF', () => {
  it('retorna IRRF zero quando salário base está na faixa isenta', () => {
    const result = calculateIRRF(2000, 150, 0);

    expect(result.baseSalaryIR).toBe(1850);
    expect(result.irrfDiscount).toBe(0);
  });

  it('calcula corretamente na faixa de 7,5%', () => {
    const result = calculateIRRF(3000, 200, 1);

    expect(result.baseSalaryIR).toBeCloseTo(2610.41, 2);
    expect(result.irrfDiscount).toBeCloseTo(26.34, 2);
  });

  it('calcula corretamente na faixa de 15%', () => {
    const result = calculateIRRF(4000, 300, 0);

    expect(result.baseSalaryIR).toBe(3700);
    expect(result.irrfDiscount).toBeCloseTo(173.56, 2);
  });

  it('calcula corretamente na faixa de 22,5%', () => {
    const result = calculateIRRF(5000, 500, 2);

    expect(result.baseSalaryIR).toBeCloseTo(4120.82, 2);
    expect(result.irrfDiscount).toBeCloseTo(264.41, 2);
  });

  it('calcula corretamente na faixa de 27,5%', () => {
    const result = calculateIRRF(8000, 800, 0);

    expect(result.baseSalaryIR).toBe(7200);
    expect(result.irrfDiscount).toBe(1084);
  });

  it('não retorna salário base negativo quando deduções excedem o bruto', () => {
    const result = calculateIRRF(1000, 500, 5);

    expect(result.baseSalaryIR).toBe(0);
    expect(result.irrfDiscount).toBe(0);
  });

  it('aplica dedução de R$ 189,59 por dependente', () => {
    const semDependentes = calculateIRRF(3000, 200, 0);
    const comUmDependente = calculateIRRF(3000, 200, 1);

    expect(semDependentes.baseSalaryIR - comUmDependente.baseSalaryIR).toBeCloseTo(
      189.59,
      2
    );
  });

  it('trata o limite superior da faixa isenta (R$ 2.259,20)', () => {
    const result = calculateIRRF(2409.2, 150, 0);

    expect(result.baseSalaryIR).toBe(2259.2);
    expect(result.irrfDiscount).toBe(0);
  });

  it('trata o limite inferior da faixa de 7,5% (R$ 2.259,21)', () => {
    const result = calculateIRRF(2409.21, 150, 0);

    expect(result.baseSalaryIR).toBeCloseTo(2259.21, 2);
    expect(result.irrfDiscount).toBeCloseTo(0, 2);
  });
});
