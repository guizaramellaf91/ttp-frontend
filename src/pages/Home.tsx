import { EmployeeForm } from '@/components/EmployeeForm';
import { SearchBar } from '@/components/SearchBar';
import { EmployeeTable } from '@/components/EmployeeTable';
import { SectionTitle } from '@/components/ui';
import { useEmployeePage } from '@/hooks';
import {
  Container,
  EmployeesSection,
  Header,
  LoadingState,
  Subtitle,
  Title,
} from './Home.styles';

export function Home() {
  const {
    filteredEmployees,
    editingEmployee,
    isHydrated,
    handleEdit,
    handleDelete,
    handleCancelEdit,
    handleFormSuccess,
  } = useEmployeePage();

  if (!isHydrated) {
    return (
      <Container>
        <LoadingState>Carregando funcionários...</LoadingState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Gestão de Funcionários</Title>
        <Subtitle>Cadastro e cálculo de IRRF</Subtitle>
      </Header>

      <EmployeeForm
        editingEmployee={editingEmployee}
        onCancelEdit={handleCancelEdit}
        onSuccess={handleFormSuccess}
      />

      <EmployeesSection>
        <SectionTitle>Funcionários Cadastrados</SectionTitle>
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
