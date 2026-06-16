import { useState } from 'react';
import type { Employee } from '../types/Employee';
import { EmployeeForm } from '../components/EmployeeForm';
import { SearchBar } from '../components/SearchBar';
import { EmployeeTable } from '../components/EmployeeTable';
import { useEmployees } from '../context/EmployeeContext';
import './Home.css';

export function Home() {
  const { filteredEmployees, deleteEmployee } = useEmployees();
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir este funcionário?'
    );
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
    <div className="home">
      <header className="home-header">
        <h1>Gestão de Funcionários</h1>
        <p>Cadastro e cálculo de IRRF</p>
      </header>

      <EmployeeForm
        editingEmployee={editingEmployee}
        onCancelEdit={handleCancelEdit}
      />

      <section className="employees-section">
        <SearchBar />
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}
