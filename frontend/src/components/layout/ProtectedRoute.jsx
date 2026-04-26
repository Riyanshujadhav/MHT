import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute({ role }) {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (role && session.role !== role) {
    return (
      <Navigate
        to={session.role === "PATIENT" ? "/patient/dashboard" : "/doctor/dashboard"}
        replace
      />
    );
  }

  return <Outlet />;
}
