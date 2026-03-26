import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import RootErrorBoundary from "./RootErrorBoundary";
import "./index.css";

const el = document.getElementById("root");
if (!el) {
  throw new Error("Falta #root en index.html");
}

createRoot(el).render(
  <StrictMode>
    <RootErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RootErrorBoundary>
  </StrictMode>,
);
