import { useSelector } from "react-redux";
import { Route, RouteProps } from "react-router-dom";
import { selectCurrentUser } from "../redux/slices/authSlice";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute({ ...rest }: RouteProps) {
  const user = useSelector(selectCurrentUser);
  return (
    <Route
      {...rest}
      element={!!user ? <Outlet /> : <Navigate to="/" replace />}
    />
  );
}

export default AuthRoute;
