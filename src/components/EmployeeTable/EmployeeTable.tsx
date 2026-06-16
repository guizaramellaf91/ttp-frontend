import type { EmployeeWithTax } from '../../types/Employee';
import { formatCPF, formatCurrency } from '../../utils/formatters';
import { Button } from '../ui';
import {
  EmptyState,
  Table,
  TableActions,
  TableWrapper,
} from './EmployeeTable.styles';

interface EmployeeTableProps {
  employees: EmployeeWithTax[];
  onEdit: (employee: EmployeeWithTax) => void;
  onDelete: (id: string) => void;
}

export function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <EmptyState>
        <p>Nenhum funcionário encontrado.</p>
      </EmptyState>
    );
  }

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Salário Bruto</th>
            <th>Desconto Previdência</th>
            <th>Dependentes</th>
            <th>Salário Base IR</th>
            <th>Desconto IRRF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td data-label="Nome">{employee.name}</td>
              <td data-label="CPF">{formatCPF(employee.cpf)}</td>
              <td data-label="Salário Bruto">
                {formatCurrency(employee.grossSalary)}
              </td>
              <td data-label="Desconto Previdência">
                {formatCurrency(employee.socialSecurityDiscount)}
              </td>
              <td data-label="Dependentes">{employee.dependents}</td>
              <td data-label="Salário Base IR">
                {formatCurrency(employee.baseSalaryIR)}
              </td>
              <td data-label="Desconto IRRF">
                {formatCurrency(employee.irrfDiscount)}
              </td>
              <td data-label="Ações">
                <TableActions>
                  <Button
                    type="button"
                    $variant="edit"
                    onClick={() => onEdit(employee)}
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    $variant="delete"
                    onClick={() => onDelete(employee.id)}
                  >
                    Excluir
                  </Button>
                </TableActions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}
