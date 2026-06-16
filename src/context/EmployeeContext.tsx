import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
  useState,
  type ReactNode,
} from 'react';
import type { Employee, EmployeeWithTax, SearchFilters } from '../types/Employee';
import { loadSampleEmployees } from '../data/loadSampleEmployees';
import { calculateIRRF } from '../utils/calculateIRRF';
import {
  loadEmployeesFromStorage,
  saveEmployeesToStorage,
} from '../utils/employeeStorage';
import { employeeReducer, initialState } from './employeeReducer';

interface EmployeeContextValue {
  employees: Employee[];
  filteredEmployees: EmployeeWithTax[];
  searchFilters: SearchFilters;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
}

const EmployeeContext = createContext<EmployeeContextValue | null>(null);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = loadEmployeesFromStorage();
    const employees = stored.length > 0 ? stored : loadSampleEmployees();
    dispatch({ type: 'SET_EMPLOYEES', payload: employees });
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    saveEmployeesToStorage(state.employees);
  }, [state.employees, isHydrated]);

  const filteredEmployees = useMemo<EmployeeWithTax[]>(() => {
    const nameFilter = state.searchFilters.name.toLowerCase().trim();
    const cpfFilter = state.searchFilters.cpf.replace(/\D/g, '');

    return state.employees
      .map((emp) => {
        const tax = calculateIRRF(
          emp.grossSalary,
          emp.socialSecurityDiscount,
          emp.dependents
        );
        return { ...emp, ...tax };
      })
      .filter((emp) => {
        const matchesName =
          !nameFilter || emp.name.toLowerCase().includes(nameFilter);
        const matchesCpf =
          !cpfFilter || emp.cpf.replace(/\D/g, '').includes(cpfFilter);
        return matchesName && matchesCpf;
      });
  }, [state.employees, state.searchFilters]);

  const addEmployee = useCallback((employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: crypto.randomUUID(),
    };
    dispatch({ type: 'ADD_EMPLOYEE', payload: newEmployee });
  }, []);

  const updateEmployee = useCallback((employee: Employee) => {
    dispatch({ type: 'UPDATE_EMPLOYEE', payload: employee });
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
  }, []);

  const setSearchFilters = useCallback((filters: Partial<SearchFilters>) => {
    dispatch({ type: 'SET_SEARCH_FILTERS', payload: filters });
  }, []);

  const value = useMemo<EmployeeContextValue>(
    () => ({
      employees: state.employees,
      filteredEmployees,
      searchFilters: state.searchFilters,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      setSearchFilters,
    }),
    [
      state.employees,
      state.searchFilters,
      filteredEmployees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      setSearchFilters,
    ]
  );

  return (
    <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
  );
}

export function useEmployees(): EmployeeContextValue {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees deve ser usado dentro de EmployeeProvider');
  }
  return context;
}
