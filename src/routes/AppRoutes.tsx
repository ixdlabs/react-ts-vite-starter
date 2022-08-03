import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { useAuth } from "@/state/auth";

function AuthedRoute() {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

function NonAuthedRoute() {
  const { isAuth } = useAuth();
  return !isAuth ? <Outlet /> : <Navigate to="/" />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NonAuthedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<AuthedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRoutes };
