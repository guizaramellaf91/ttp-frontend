import { useState, useEffect, type FormEvent } from 'react';
import type { Employee, EmployeeFormData, FormErrors } from '../../types/Employee';
import {
  formatCPF,
  formatCurrencyInput,
  isValidCPF,
  parseCurrency,
} from '../../utils/formatters';
import { useEmployees } from '../../context/EmployeeContext';
import './EmployeeForm.css';

const emptyForm: EmployeeFormData = {
  name: '',
  cpf: '',
  grossSalary: '',
  socialSecurityDiscount: '',
  dependents: '0',
};

interface EmployeeFormProps {
  editingEmployee: Employee | null;
  onCancelEdit: () => void;
}

function validateForm(data: EmployeeFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Nome é obrigatório';
  }

  if (!data.cpf.trim()) {
    errors.cpf = 'CPF é obrigatório';
  } else if (!isValidCPF(data.cpf)) {
    errors.cpf = 'CPF inválido';
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
  }

  return errors;
}

export function EmployeeForm({ editingEmployee, onCancelEdit }: EmployeeFormProps) {
  const { addEmployee, updateEmployee } = useEmployees();
  const [formData, setFormData] = useState<EmployeeFormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name,
        cpf: formatCPF(editingEmployee.cpf),
        grossSalary: editingEmployee.grossSalary.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        socialSecurityDiscount:
          editingEmployee.socialSecurityDiscount.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        dependents: String(editingEmployee.dependents),
      });
      setErrors({});
    } else {
      setFormData(emptyForm);
      setErrors({});
    }
  }, [editingEmployee]);

  const handleChange = (field: keyof EmployeeFormData, value: string) => {
    let formatted = value;

    if (field === 'cpf') {
      formatted = formatCPF(value);
    } else if (field === 'grossSalary' || field === 'socialSecurityDiscount') {
      formatted = formatCurrencyInput(value);
    } else if (field === 'dependents') {
      formatted = value.replace(/\D/g, '');
    }

    setFormData((prev) => ({ ...prev, [field]: formatted }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const employeeData = {
      name: formData.name.trim(),
      cpf: formData.cpf.replace(/\D/g, ''),
      grossSalary: parseCurrency(formData.grossSalary),
      socialSecurityDiscount: parseCurrency(formData.socialSecurityDiscount),
      dependents: parseInt(formData.dependents, 10) || 0,
    };

    if (editingEmployee) {
      updateEmployee({ ...employeeData, id: editingEmployee.id });
      onCancelEdit();
    } else {
      addEmployee(employeeData);
    }

    setFormData(emptyForm);
    setErrors({});
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setErrors({});
    onCancelEdit();
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>{editingEmployee ? 'Editar Funcionário' : 'Cadastrar Funcionário'}</h2>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Nome completo"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            type="text"
            value={formData.cpf}
            onChange={(e) => handleChange('cpf', e.target.value)}
            placeholder="000.000.000-00"
            maxLength={14}
            className={errors.cpf ? 'input-error' : ''}
          />
          {errors.cpf && <span className="error-message">{errors.cpf}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="grossSalary">Salário Bruto</label>
          <div className="input-prefix">
            <span>R$</span>
            <input
              id="grossSalary"
              type="text"
              value={formData.grossSalary}
              onChange={(e) => handleChange('grossSalary', e.target.value)}
              placeholder="0,00"
              className={errors.grossSalary ? 'input-error' : ''}
            />
          </div>
          {errors.grossSalary && (
            <span className="error-message">{errors.grossSalary}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="socialSecurityDiscount">Desconto Previdência</label>
          <div className="input-prefix">
            <span>R$</span>
            <input
              id="socialSecurityDiscount"
              type="text"
              value={formData.socialSecurityDiscount}
              onChange={(e) =>
                handleChange('socialSecurityDiscount', e.target.value)
              }
              placeholder="0,00"
              className={errors.socialSecurityDiscount ? 'input-error' : ''}
            />
          </div>
          {errors.socialSecurityDiscount && (
            <span className="error-message">{errors.socialSecurityDiscount}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dependents">Número de Dependentes</label>
          <input
            id="dependents"
            type="text"
            value={formData.dependents}
            onChange={(e) => handleChange('dependents', e.target.value)}
            placeholder="0"
            className={errors.dependents ? 'input-error' : ''}
          />
          {errors.dependents && (
            <span className="error-message">{errors.dependents}</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingEmployee ? 'Salvar Alterações' : 'Cadastrar'}
        </button>
        {editingEmployee && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
