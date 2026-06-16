import { useState } from 'react';
import type { Employee } from '../types/Employee';
import { EmployeeForm } from '../components/EmployeeForm';
import { SearchBar } from '../components/SearchBar';
import { EmployeeTable } from '../components/EmployeeTable';
import { useConfirm } from '../components/ui';
import { useEmployees } from '../context/EmployeeContext';
import {
  Container,
  EmployeesSection,
  Header,
  Subtitle,
  Title,
} from './Home.styles';

export function Home() {
  const { filteredEmployees, deleteEmployee } = useEmployees();
  const confirm = useConfirm();
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({
      title: 'Excluir funcionário',
      message: 'Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita.',
      confirmLabel: 'Excluir',
      cancelLabel: 'Cancelar',
    });

    if (confirmed) {
      deleteEmployee(id);
      if (editingEmployee?.id === id) {
        setEditingEmployee(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  return (
    <Container>
      <Header>
        <Title>Gestão de Funcionários</Title>
        <Subtitle>Cadastro e cálculo de IRRF</Subtitle>
      </Header>

      <EmployeeForm
        editingEmployee={editingEmployee}
        onCancelEdit={handleCancelEdit}
      />

      <EmployeesSection>
        <SearchBar />
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </EmployeesSection>
    </Container>
  );
}
