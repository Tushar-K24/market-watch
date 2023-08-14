import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SymbolsContextProvider } from "./Contexts/symbolsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SymbolsContextProvider>
      <App />
    </SymbolsContextProvider>
  </React.StrictMode>
);
