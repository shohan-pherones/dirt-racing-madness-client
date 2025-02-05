import { AuthResponse, User } from "@/types/generated/graphql";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      toast.success("Logged in successfully!");
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      toast.success("Logged out successfully!");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
