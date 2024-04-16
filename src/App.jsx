import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom"; // Import HashRouter
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import useDarkMode from "use-dark-mode";
import AppContext from "./AppContext";
import MainApp from "./MainApp";
import GlobalStyles from "./theme/GlobalStyles";
import { lightTheme, darkTheme } from "./theme/themes";

const queryClient = new QueryClient();

function App() {
    const darkMode = useDarkMode(true);

    return (
        <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={{ darkMode }}>
                <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <div className="App">
                        <HashRouter>
                            {" "}
                            {/* Use HashRouter here */}
                            <MainApp />
                        </HashRouter>
                    </div>
                </ThemeProvider>
            </AppContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
