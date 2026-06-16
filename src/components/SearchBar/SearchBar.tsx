import { useEmployees } from '@/hooks';
import { formatCPF } from '@/utils/formatters';
import { FormField, Input, Label } from '@/components/ui';
import { SearchContainer, SearchFields } from './SearchBar.styles';

export function SearchBar() {
  const { searchFilters, setSearchFilters } = useEmployees();

  return (
    <SearchContainer>
      <SearchFields>
        <FormField>
          <Label htmlFor="search-name">Buscar por Nome</Label>
          <Input
            id="search-name"
            type="text"
            value={searchFilters.name}
            onChange={(e) => setSearchFilters({ name: e.target.value })}
            placeholder="Digite o nome..."
          />
        </FormField>
        <FormField>
          <Label htmlFor="search-cpf">Buscar por CPF</Label>
          <Input
            id="search-cpf"
            type="text"
            value={searchFilters.cpf}
            onChange={(e) => setSearchFilters({ cpf: formatCPF(e.target.value) })}
            placeholder="000.000.000-00"
            maxLength={14}
          />
        </FormField>
      </SearchFields>
    </SearchContainer>
  );
}
