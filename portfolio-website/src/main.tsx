import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>
);
