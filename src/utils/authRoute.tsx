import { RouteProps } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AuthRoute({ children }: RouteProps) {
  const { isLoggedIn} = useAuth();
  return <>{isLoggedIn ? children : null}</>;
}

export default AuthRoute;
