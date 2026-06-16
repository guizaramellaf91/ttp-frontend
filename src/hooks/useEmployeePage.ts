import { useState, useCallback } from 'react';
import type { Employee } from '@/types/Employee';
import { useEmployees } from '@/context/EmployeeContext';
import { useConfirm } from '@/components/ui/ConfirmDialog';

export function useEmployeePage() {
  const { filteredEmployees, deleteEmployee } = useEmployees();
  const confirm = useConfirm();
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleEdit = useCallback((employee: Employee) => {
    setEditingEmployee(employee);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = await confirm({
        title: 'Excluir funcionário',
        message:
          'Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita.',
        confirmLabel: 'Excluir',
        cancelLabel: 'Cancelar',
      });

      if (!confirmed) return;

      deleteEmployee(id);
      setEditingEmployee((current) => (current?.id === id ? null : current));
    },
    [confirm, deleteEmployee]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingEmployee(null);
  }, []);

  return {
    filteredEmployees,
    editingEmployee,
    handleEdit,
    handleDelete,
    handleCancelEdit,
  };
}
