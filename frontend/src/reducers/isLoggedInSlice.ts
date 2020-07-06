import { createSlice } from "@reduxjs/toolkit";

//https://redux-toolkit.js.org/api/createSlice
export const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState: false,//also has ids[] and entities{}
  reducers: {
    login_success: () => { return true },
    logout: () => { return false }
  }
})

export default isLoggedInSlice.reducer;
