import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BoothProvider } from "./context/booth-provider.tsx";
import "./tailwind.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BoothProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </BoothProvider>
);
