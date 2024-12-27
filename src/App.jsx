import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import useDarkMode from "use-dark-mode";
import AppContext from "./contexts/AppContext";
import MainApp from "./MainApp";
import GlobalStyles from "./theme/GlobalStyles";
import { lightTheme, darkTheme } from "./theme/themes";
import CustomCursor from "./cursor/CustomCursor";
import { AudioProvider } from "./contexts/AudioContext";
import AudioPlayer from "./components/AudioPlayer";

const queryClient = new QueryClient();

function App() {
    const darkMode = useDarkMode(true);

    const contextValue = React.useMemo(() => ({ darkMode }), [darkMode]);

    return (
        <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={contextValue}>
            <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
            <GlobalStyles />
            <div className="App">
                <CustomCursor />
                <HashRouter>
                <AudioProvider>
                    <MainApp />
                    <AudioPlayer />
                </AudioProvider>
                </HashRouter>
            </div>
            </ThemeProvider>
        </AppContext.Provider>
        </QueryClientProvider>
    );
}

export default App;
