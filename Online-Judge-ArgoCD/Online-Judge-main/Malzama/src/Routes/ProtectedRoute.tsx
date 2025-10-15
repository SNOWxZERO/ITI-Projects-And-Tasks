import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

export default function ProtectedRoute() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  const location = useLocation();
  return token ? (
    <Outlet />  
  ) : (
    <Navigate state={{ from: location }} replace to="/signin" />
  );
}

