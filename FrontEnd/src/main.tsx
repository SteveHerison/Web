import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CadastroProvider } from "./contexts/UserCompanyContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CadastroProvider>
        <App />
      </CadastroProvider>
    </BrowserRouter>
  </StrictMode>
);
