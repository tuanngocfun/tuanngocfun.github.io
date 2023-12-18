import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query'; // Importing React Query
import useDarkMode from 'use-dark-mode';
import AppContext from './AppContext';
import MainApp from './MainApp';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme, darkTheme } from './theme/themes';

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  window.matchMedia = null; // Ensure this line is still relevant for your needs
  const darkMode = useDarkMode(true);

  return (
    <QueryClientProvider client={queryClient}> {/* Wrapping with QueryClientProvider */}
      <AppContext.Provider value={{ darkMode }}>
        <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
          <GlobalStyles />
          <div className="App">
            <BrowserRouter>
              <MainApp />
            </BrowserRouter>
          </div>
        </ThemeProvider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
