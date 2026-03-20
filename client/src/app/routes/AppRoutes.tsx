import { lazy } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { BaseLayout } from "../layouts/BaseLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/shared/ui";

// Pages
const Home = lazy(() => import("@/features/home/Home"));
const Register = lazy(() => import("@/features/auth/pages/Register"));
const Login = lazy(() => import("@/features/auth/pages/Login"));
const Dashboard = lazy(() => import("@/features/dashboard/pages/Dashboard"));
const Endpoint = lazy(() => import("@/features/dashboard/pages/Endpoint"));
const Webhook = lazy(() => import("@/features/dashboard/pages/Webhook"));
const NotFound = lazy(() => import("@/features/misc/NotFound"))

function ProtectedRoute() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <Loader className="h-screen" />;
  if (user && isAuthenticated) return <Outlet />;
  return <Navigate to="/login" replace />;
}

function AuthRoute() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <Loader className="h-screen" />;
  if (user && isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/endpoints/:id" element={<Endpoint />} />
            <Route path="/webhooks/:slug" element={<Webhook />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<AuthRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
