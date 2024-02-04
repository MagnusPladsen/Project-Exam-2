import { useEffect, useState } from "react";

function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");

    if (!!token) {
      const user = JSON.parse(localStorage.getItem("user") || "");

      setUser(user);
    }

    return !!token;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  const logIn = (user: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
  }

  return { user, isLoggedIn, logOut, logIn };
}

export default useAuth;
