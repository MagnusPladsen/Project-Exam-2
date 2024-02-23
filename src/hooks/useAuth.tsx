import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCredentials,
  selectCurrentUser,
  selectToken,
  setCredentials,
} from "../redux/slices/authSlice";
import { useLazyGetProfileQuery } from "../services/api/holidazeApi";
import { User } from "../types/types";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const oldUser = useSelector(selectCurrentUser);
  const [updateProfile] = useLazyGetProfileQuery();

  const [user, setUser] = useState<User | null>(null);

  const saveUser = (user: User) => {
    dispatch(setCredentials({ user: user, token: user.accessToken }));
  };

  const logOut = () => {
    dispatch(removeCredentials());
    navigate("/login");
  };

  const isLoggedIn = !!token && !!oldUser;

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn) {
        const user = await updateProfile(oldUser.name).unwrap();
        setUser(user);
      }
    };
    fetchUser();
  }, [isLoggedIn, oldUser]);

  return { isLoggedIn, user, token, saveUser, logOut };
}

export default useAuth;
