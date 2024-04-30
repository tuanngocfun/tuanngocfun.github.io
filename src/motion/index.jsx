import React from "react";
import { StrictMode, useState } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./MouseTracing";
import { Footer } from "./template/Footer";
import { Refresh } from "./template/Refresh";

function AppWithUI() {
    const [count, setCount] = useState(0);

    return (
        <StrictMode>
            <Refresh onClick={() => setCount(count + 1)} />
            <App key={count} />
            <Footer
                title="Spring transitions"
                url="https://www.framer.com/docs/transition/"
            />
        </StrictMode>
    );
}

const rootElement = document.getElementById("root");
if (rootElement !== null) {
    const root = ReactDOMClient.createRoot(rootElement);
    root.render(<AppWithUI />);
} else {
    console.error("Failed to find the root element.");
}
