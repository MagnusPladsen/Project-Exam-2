import { RouteProps, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useGetPath from "../hooks/useGetPath";
import { useEffect } from "react";

function AuthWrapper({ children }: RouteProps) {
  const { isLoggedIn } = useAuth();
  const { isProtectedRoute } = useGetPath();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isProtectedRoute && !isLoggedIn) {
      navigate("/login");
    }
  }, [isProtectedRoute, isLoggedIn, navigate]);

  return <>{children}</>;
}

export default AuthWrapper;
