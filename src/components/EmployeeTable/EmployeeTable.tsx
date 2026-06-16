import type { EmployeeWithTax } from '../../types/Employee';
import { formatCPF, formatCurrency } from '../../utils/formatters';
import './EmployeeTable.css';

interface EmployeeTableProps {
  employees: EmployeeWithTax[];
  onEdit: (employee: EmployeeWithTax) => void;
  onDelete: (id: string) => void;
}

export function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <div className="table-empty">
        <p>Nenhum funcionário encontrado.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="employee-table">
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
                <div className="table-actions">
                  <button
                    type="button"
                    className="btn btn-edit"
                    onClick={() => onEdit(employee)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-delete"
                    onClick={() => onDelete(employee.id)}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
