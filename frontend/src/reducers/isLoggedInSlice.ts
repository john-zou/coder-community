import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JwtLocalStorageKey } from "../constants";

//https://redux-toolkit.js.org/api/createSlice
export const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState: !!localStorage.getItem(JwtLocalStorageKey),//also has ids[] and entities{}
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ jwt: string }>) => {
      const jwt = action.payload.jwt;
      localStorage.setItem(JwtLocalStorageKey, jwt);
      return true
    },
    logout: () => {
      localStorage.removeItem(JwtLocalStorageKey);
      return false
    }
  }
})

export default isLoggedInSlice.reducer;

export const {
  loginSuccess, logout
} = isLoggedInSlice.actions;