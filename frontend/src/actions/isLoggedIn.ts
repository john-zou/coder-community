import { LOGIN_SUCCESS, LOGOUT } from "./constants";
import { JwtLocalStorageKey } from "../constants";

export function login(jwt: string) {
  localStorage.setItem(JwtLocalStorageKey, jwt);
  return {
    type: LOGIN_SUCCESS,
  }
}

export function logout() {
  try {
    localStorage.removeItem(JwtLocalStorageKey);
  } catch (err) {

  }
  return {
    type: LOGOUT
  }
}