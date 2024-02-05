import { redirect } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, logIn, logOut, user } = useAuth();

  if (isLoggedIn() && !!user) {
    console.log("User is logged in");
    return <>{children}</>;
  }
  if (!isLoggedIn && !user) {
    console.log("User is not logged in");
    redirect("/profile/login");
  }

  console.log(isLoggedIn(), user)
  return <></>;
}

export default AuthWrapper;
