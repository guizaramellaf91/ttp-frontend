import { ThemeProvider } from 'styled-components';
import { EmployeeProvider } from './context/EmployeeContext';
import { ConfirmDialogProvider } from './components/ui';
import { Home } from './pages/Home';
import { theme, GlobalStyle } from './styles';
import { AppContainer } from './App.styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ConfirmDialogProvider>
        <EmployeeProvider>
          <AppContainer>
            <Home />
          </AppContainer>
        </EmployeeProvider>
      </ConfirmDialogProvider>
    </ThemeProvider>
  );
}

export default App;
