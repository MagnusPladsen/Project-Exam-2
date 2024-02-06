import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/api/authService";

function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");

    if (!!token) {
      try {
        const user = JSON.parse(localStorage.getItem("user")!);
        if (!!user) {
          setUser(user);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Handle gracefully
      }
    }

    return !!token;
  };


  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const saveProfile = (user: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
  };

  return { user, isLoggedIn, logOut, saveProfile };
}

export default useAuth;
