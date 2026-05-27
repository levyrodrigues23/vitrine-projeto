import { Navigate, Outlet } from "react-router";
import { useAuthStore, type Role } from "../../store/useAuthStore";

type ProtectedRouteProps = {
  allowedRoles?: Role[];
};

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    

    const redirectPath = user.role === "admin" ? "/admin" : "/gerenciador";
    return <Navigate to={redirectPath} replace />;
  }


  return <Outlet />;
}
