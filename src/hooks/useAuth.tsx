import { useDispatch, useSelector } from "react-redux";
import {
  removeCredentials,
  selectCurrentUser,
  selectToken,
  setCredentials,
} from "../redux/slices/authSlice";
import { User } from "../types/types";
import { useGetProfileQuery } from "../services/api/holidazeApi";

function useAuth() {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const oldUser = useSelector(selectCurrentUser);
  const { data: user } = useGetProfileQuery(oldUser!.name);

  const saveUser = (user: User) => {
    dispatch(setCredentials({ user: user, token: user.accessToken }));
  };

  const logOut = () => {
    dispatch(removeCredentials());
  };

  const isLoggedIn = !!token && !!oldUser;

  return { isLoggedIn, user, token, saveUser, logOut };
}

export default useAuth;
