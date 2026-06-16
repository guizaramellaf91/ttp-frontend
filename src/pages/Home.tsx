import { EmployeeForm } from '@/components/EmployeeForm';
import { SearchBar } from '@/components/SearchBar';
import { EmployeeTable } from '@/components/EmployeeTable';
import { useEmployeePage } from '@/hooks';
import {
  Container,
  EmployeesSection,
  Header,
  Subtitle,
  Title,
} from './Home.styles';

export function Home() {
  const {
    filteredEmployees,
    editingEmployee,
    handleEdit,
    handleDelete,
    handleCancelEdit,
  } = useEmployeePage();

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
