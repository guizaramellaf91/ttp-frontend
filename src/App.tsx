import { EmployeeProvider } from './context/EmployeeContext';
import { Home } from './pages/Home';
import './App.css';

function App() {
  return (
    <EmployeeProvider>
      <div className="app">
        <Home />
      </div>
    </EmployeeProvider>
  );
}

export default App;
