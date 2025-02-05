import { login, logout } from "@/redux/store/slices/auth.slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { AuthResponse } from "@/types/generated/graphql";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const handleLogin = useCallback(
    (payload: AuthResponse) => {
      dispatch(login(payload));
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    login: handleLogin,
    logout: handleLogout,
    authState,
  };
};
