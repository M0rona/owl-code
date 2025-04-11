import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { LoginPage } from "@/app/auth";
import { RegisterPage } from "./app/auth/register";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="registro" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
