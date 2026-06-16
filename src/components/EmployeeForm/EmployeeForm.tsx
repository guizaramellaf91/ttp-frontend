import type { Employee, FormErrors } from '@/types/Employee';
import { createEmptyForm, createFormFromEmployee } from '@/utils/employeeForm';
import { useEmployeeForm } from '@/hooks';
import {
  Button,
  FormField,
  FormGrid,
  Input,
  InputPrefix,
  Label,
  ErrorMessage,
  SectionTitle,
} from '@/components/ui';
import { Form, FormActions } from './EmployeeForm.styles';

interface EmployeeFormProps {
  editingEmployee: Employee | null;
  onCancelEdit: () => void;
  onSuccess?: () => void;
}

interface EmployeeFormFieldsProps extends EmployeeFormProps {
  initialData: ReturnType<typeof createEmptyForm>;
}

function getFieldAria(field: keyof FormErrors, errors: FormErrors) {
  const message = errors[field];
  return {
    'aria-invalid': Boolean(message),
    'aria-describedby': message ? `${field}-error` : undefined,
  };
}

function EmployeeFormFields({
  editingEmployee,
  onCancelEdit,
  onSuccess,
  initialData,
}: EmployeeFormFieldsProps) {
  const { formData, errors, isEditing, handleChange, handleSubmit, handleCancel } =
    useEmployeeForm({ initialData, editingEmployee, onCancelEdit, onSuccess });

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <SectionTitle>
        {isEditing ? 'Editar Funcionário' : 'Cadastrar Funcionário'}
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
            {...getFieldAria('name', errors)}
          />
          {errors.name && (
            <ErrorMessage id="name-error">{errors.name}</ErrorMessage>
          )}
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
            {...getFieldAria('cpf', errors)}
          />
          {errors.cpf && <ErrorMessage id="cpf-error">{errors.cpf}</ErrorMessage>}
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
              {...getFieldAria('grossSalary', errors)}
            />
          </InputPrefix>
          {errors.grossSalary && (
            <ErrorMessage id="grossSalary-error">{errors.grossSalary}</ErrorMessage>
          )}
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
              {...getFieldAria('socialSecurityDiscount', errors)}
            />
          </InputPrefix>
          {errors.socialSecurityDiscount && (
            <ErrorMessage id="socialSecurityDiscount-error">
              {errors.socialSecurityDiscount}
            </ErrorMessage>
          )}
        </FormField>

        <FormField>
          <Label htmlFor="dependents">Número de Dependentes</Label>
          <Input
            id="dependents"
            type="text"
            inputMode="numeric"
            value={formData.dependents}
            onChange={(e) => handleChange('dependents', e.target.value)}
            placeholder="0"
            maxLength={2}
            $hasError={!!errors.dependents}
            {...getFieldAria('dependents', errors)}
          />
          {errors.dependents && (
            <ErrorMessage id="dependents-error">{errors.dependents}</ErrorMessage>
          )}
        </FormField>
      </FormGrid>

      <FormActions>
        <Button type="submit" $variant="primary">
          {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
        </Button>
        {isEditing && (
          <Button type="button" $variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
        )}
      </FormActions>
    </Form>
  );
}

export function EmployeeForm({
  editingEmployee,
  onCancelEdit,
  onSuccess,
}: EmployeeFormProps) {
  const formKey = editingEmployee?.id ?? 'new';
  const initialData = editingEmployee
    ? createFormFromEmployee(editingEmployee)
    : createEmptyForm();

  return (
    <EmployeeFormFields
      key={formKey}
      editingEmployee={editingEmployee}
      onCancelEdit={onCancelEdit}
      onSuccess={onSuccess}
      initialData={initialData}
    />
  );
}
