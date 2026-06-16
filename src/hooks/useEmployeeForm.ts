import { useState, useCallback, type FormEvent } from 'react';
import type { Employee, EmployeeFormData, FormErrors } from '@/types/Employee';
import { useEmployees } from '@/context/EmployeeContext';
import {
  formatCPF,
  formatCurrencyInput,
  parseCurrency,
} from '@/utils/formatters';
import { createEmptyForm } from '@/utils/employeeForm';
import { validateEmployeeForm } from '@/utils/validateEmployeeForm';

interface UseEmployeeFormOptions {
  initialData: EmployeeFormData;
  editingEmployee: Employee | null;
  onCancelEdit: () => void;
  onSuccess?: () => void;
}

export function useEmployeeForm({
  initialData,
  editingEmployee,
  onCancelEdit,
  onSuccess,
}: UseEmployeeFormOptions) {
  const { employees, addEmployee, updateEmployee } = useEmployees();
  const [formData, setFormData] = useState<EmployeeFormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = useCallback(
    (field: keyof EmployeeFormData, value: string) => {
      let formatted = value;

      if (field === 'cpf') {
        formatted = formatCPF(value);
      } else if (field === 'grossSalary' || field === 'socialSecurityDiscount') {
        formatted = formatCurrencyInput(value);
      } else if (field === 'dependents') {
        formatted = value.replace(/\D/g, '').slice(0, 2);
      }

      setFormData((prev) => ({ ...prev, [field]: formatted }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    },
    []
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const validationErrors = validateEmployeeForm({
        data: formData,
        employees,
        editingEmployeeId: editingEmployee?.id,
      });

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
        setFormData(createEmptyForm());
      }

      setErrors({});
      onSuccess?.();
    },
    [formData, employees, editingEmployee, addEmployee, updateEmployee, onCancelEdit, onSuccess]
  );

  const handleCancel = useCallback(() => {
    setFormData(createEmptyForm());
    setErrors({});
    onCancelEdit();
  }, [onCancelEdit]);

  return {
    formData,
    errors,
    isEditing: Boolean(editingEmployee),
    handleChange,
    handleSubmit,
    handleCancel,
  };
}
