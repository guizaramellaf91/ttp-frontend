import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import type { Employee, EmployeeWithTax, SearchFilters } from '../types/Employee';
import { loadSampleEmployees } from '../data/loadSampleEmployees';
import { calculateIRRF } from '../utils/calculateIRRF';
import {
  employeeReducer,
  initialState,
  type EmployeeAction,
} from './employeeReducer';

const STORAGE_KEY = 'employees';

interface EmployeeContextValue {
  employees: Employee[];
  employeesWithTax: EmployeeWithTax[];
  filteredEmployees: EmployeeWithTax[];
  searchFilters: SearchFilters;
  dispatch: React.Dispatch<EmployeeAction>;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
}

const EmployeeContext = createContext<EmployeeContextValue | null>(null);

function loadEmployees(): Employee[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Employee[];
    }
  } catch {
  }
  return [];
}

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(employeeReducer, initialState);
  const isHydrated = useRef(false);

  useEffect(() => {
    const stored = loadEmployees();
    const employees = stored.length > 0 ? stored : loadSampleEmployees();
    dispatch({ type: 'SET_EMPLOYEES', payload: employees });
    isHydrated.current = true;
  }, []);

  useEffect(() => {
    if (!isHydrated.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.employees));
  }, [state.employees]);

  const employeesWithTax = useMemo<EmployeeWithTax[]>(
    () =>
      state.employees.map((emp) => {
        const tax = calculateIRRF(
          emp.grossSalary,
          emp.socialSecurityDiscount,
          emp.dependents
        );
        return { ...emp, ...tax };
      }),
    [state.employees]
  );

  const filteredEmployees = useMemo(() => {
    const nameFilter = state.searchFilters.name.toLowerCase().trim();
    const cpfFilter = state.searchFilters.cpf.replace(/\D/g, '');

    return employeesWithTax.filter((emp) => {
      const matchesName =
        !nameFilter || emp.name.toLowerCase().includes(nameFilter);
      const matchesCpf =
        !cpfFilter || emp.cpf.replace(/\D/g, '').includes(cpfFilter);
      return matchesName && matchesCpf;
    });
  }, [employeesWithTax, state.searchFilters]);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: crypto.randomUUID(),
    };
    dispatch({ type: 'ADD_EMPLOYEE', payload: newEmployee });
  };

  const updateEmployee = (employee: Employee) => {
    dispatch({ type: 'UPDATE_EMPLOYEE', payload: employee });
  };

  const deleteEmployee = (id: string) => {
    dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
  };

  const setSearchFilters = (filters: Partial<SearchFilters>) => {
    dispatch({ type: 'SET_SEARCH_FILTERS', payload: filters });
  };

  const value: EmployeeContextValue = {
    employees: state.employees,
    employeesWithTax,
    filteredEmployees,
    searchFilters: state.searchFilters,
    dispatch,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    setSearchFilters,
  };

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
