import { useEmployees } from '../../context/EmployeeContext';
import { formatCPF } from '../../utils/formatters';
import './SearchBar.css';

export function SearchBar() {
  const { searchFilters, setSearchFilters } = useEmployees();

  return (
    <div className="search-bar">
      <h2>Funcionários Cadastrados</h2>
      <div className="search-fields">
        <div className="search-group">
          <label htmlFor="search-name">Buscar por Nome</label>
          <input
            id="search-name"
            type="text"
            value={searchFilters.name}
            onChange={(e) => setSearchFilters({ name: e.target.value })}
            placeholder="Digite o nome..."
          />
        </div>
        <div className="search-group">
          <label htmlFor="search-cpf">Buscar por CPF</label>
          <input
            id="search-cpf"
            type="text"
            value={searchFilters.cpf}
            onChange={(e) => setSearchFilters({ cpf: formatCPF(e.target.value) })}
            placeholder="000.000.000-00"
            maxLength={14}
          />
        </div>
      </div>
    </div>
  );
}
