import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../services/api/authService";
import {
  removeCredentials,
  selectCurrentUser,
  selectToken,
  setCredentials,
} from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const user = useSelector(selectCurrentUser);

  const saveUser = (user: User) => {
    dispatch(setCredentials({ user: user, token: user.accessToken }));
    navigate("/venues");
  };

  const logOut = () => {
    dispatch(removeCredentials());
  };

  const isLoggedIn = !!token && !!user;

  return { isLoggedIn, user, token, saveUser, logOut };
}

export default useAuth;
