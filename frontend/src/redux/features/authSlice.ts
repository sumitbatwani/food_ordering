import { createSlice } from "@reduxjs/toolkit";
import { AUTH_TOKEN } from "../../constants/constants";

interface AuthState {
  token: string | null;
}

const getTokenFromLocalStorage = (): string | null => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN);
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error("Error retrieving token from local storage:", error);
    return null;
  }
};

const initialState: AuthState = {
  token: getTokenFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
      try {
        localStorage.setItem(AUTH_TOKEN, JSON.stringify(action.payload));
      } catch (error) {
        console.error("Error setting token in local storage:", error);
      }
    },
    logout: (state) => {
      state.token = null;
      try {
        localStorage.removeItem(AUTH_TOKEN);
      } catch (error) {
        console.error("Error removing token from local storage:", error);
      }
    },
  },
});

export const { setAuthToken, logout } = authSlice.actions;
export default authSlice.reducer;
