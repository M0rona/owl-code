import { BrowserRouter, Routes, Route } from "react-router";
import { LoginPage } from "../app/auth";
import { RegisterPage } from "../app/auth/register";
import { AuthGuard } from "./guard";
import { DashboardPage } from "@/app/dashboard";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="registro" element={<RegisterPage />} />

        {/* Private routes */}
        <Route element={<AuthGuard />}>
          <Route element={<DashboardPage />} path="/dashboard" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
