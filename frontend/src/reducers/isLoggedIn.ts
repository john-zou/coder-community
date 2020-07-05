import { ReduxAction } from "../actions/constants";

export function isLoggedIn(state = false, action: ReduxAction): boolean {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return true;
    case "LOGOUT":
      return false;
  }
  return state;
}