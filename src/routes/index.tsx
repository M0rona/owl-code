import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../app/auth/login";
import { RegisterPage } from "../app/auth/register";
import { AuthGuard } from "./guard";
import { DashboardPage } from "@/app/dashboard";
import { Redirect } from "@/app";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Redirect />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registro" element={<RegisterPage />} />

        {/* Private routes */}
        <Route element={<AuthGuard />}>
          <Route element={<DashboardPage />} path="/dashboard" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
