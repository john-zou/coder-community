import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JwtLocalStorageKey } from "../constants";

//https://redux-toolkit.js.org/api/createSlice
export const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState: !!localStorage.getItem(JwtLocalStorageKey),//also has ids[] and entities{}
  reducers: {
    loginSuccess: {
      reducer: (user, action: PayloadAction<null>) => {
        return true;
      },
      prepare: ({jwt}: {jwt: string}) => {
        localStorage.setItem(JwtLocalStorageKey, jwt);

        return {payload: null};
      },
    },
    logOut: {
      reducer: (user, action: PayloadAction<null>) => {
        return false;
      },
      prepare: () => {
        localStorage.removeItem(JwtLocalStorageKey);
        return { payload: null };
      }
    },
  }
})

export default isLoggedInSlice.reducer;

export const {
  loginSuccess, logOut
} = isLoggedInSlice.actions;