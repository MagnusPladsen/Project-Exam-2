import { RouteProps } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AuthRoute({ children }: RouteProps) {
  const { isLoggedIn } = useAuth();
  !isLoggedIn && window.location.replace("/login");
  return <>{children}</>;
}

export default AuthRoute;
