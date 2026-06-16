import { useState, useEffect, type FormEvent } from 'react';
import type { Employee, EmployeeFormData, FormErrors } from '../../types/Employee';
import {
  formatCPF,
  formatCurrencyInput,
  isValidCPF,
  parseCurrency,
} from '../../utils/formatters';
import { useEmployees } from '../../context/EmployeeContext';
import {
  Button,
  FormField,
  FormGrid,
  Input,
  InputPrefix,
  Label,
  ErrorMessage,
  SectionTitle,
} from '../ui';
import { Form, FormActions } from './EmployeeForm.styles';

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
    <Form onSubmit={handleSubmit}>
      <SectionTitle>
        {editingEmployee ? 'Editar Funcionário' : 'Cadastrar Funcionário'}
      </SectionTitle>

      <FormGrid>
        <FormField>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Nome completo"
            $hasError={!!errors.name}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            type="text"
            value={formData.cpf}
            onChange={(e) => handleChange('cpf', e.target.value)}
            placeholder="000.000.000-00"
            maxLength={14}
            $hasError={!!errors.cpf}
          />
          {errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="grossSalary">Salário Bruto</Label>
          <InputPrefix $hasError={!!errors.grossSalary}>
            <span>R$</span>
            <Input
              id="grossSalary"
              type="text"
              value={formData.grossSalary}
              onChange={(e) => handleChange('grossSalary', e.target.value)}
              placeholder="0,00"
              $hasError={!!errors.grossSalary}
            />
          </InputPrefix>
          {errors.grossSalary && <ErrorMessage>{errors.grossSalary}</ErrorMessage>}
        </FormField>

        <FormField>
          <Label htmlFor="socialSecurityDiscount">Desconto Previdência</Label>
          <InputPrefix $hasError={!!errors.socialSecurityDiscount}>
            <span>R$</span>
            <Input
              id="socialSecurityDiscount"
              type="text"
              value={formData.socialSecurityDiscount}
              onChange={(e) =>
                handleChange('socialSecurityDiscount', e.target.value)
              }
              placeholder="0,00"
              $hasError={!!errors.socialSecurityDiscount}
            />
          </InputPrefix>
          {errors.socialSecurityDiscount && (
            <ErrorMessage>{errors.socialSecurityDiscount}</ErrorMessage>
          )}
        </FormField>

        <FormField>
          <Label htmlFor="dependents">Número de Dependentes</Label>
          <Input
            id="dependents"
            type="text"
            value={formData.dependents}
            onChange={(e) => handleChange('dependents', e.target.value)}
            placeholder="0"
            $hasError={!!errors.dependents}
          />
          {errors.dependents && <ErrorMessage>{errors.dependents}</ErrorMessage>}
        </FormField>
      </FormGrid>

      <FormActions>
        <Button type="submit" $variant="primary">
          {editingEmployee ? 'Salvar Alterações' : 'Cadastrar'}
        </Button>
        {editingEmployee && (
          <Button type="button" $variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        )}
      </FormActions>
    </Form>
  );
}
