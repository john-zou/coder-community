import { UserApi } from '../api';
import { ReduxAction } from './constants';

const getLoggedInUserBegin = (): ReduxAction => {
  return {
    type: "USER_PENDING"
  }
}

const getLoggedInUserSuccess = (user): ReduxAction => {
  return {
    type: "USER_SUCCESS",
    payload: user,
  }
}

const getLoggedInUserFailure = (error): ReduxAction => {
  return {
    type: "USER_FAILURE",
    payload: error,
  }
}

const getUserForViewProfileBegin = (): ReduxAction => {
  return {
    type: "USER_PROFILE_PENDING"
  }
}

const getUserForViewProfileSuccess = (payload): ReduxAction => {
  return {
    type: "USER_PROFILE_SUCCESS",
    payload
  }
}

const getUserForViewProfileError = (error): ReduxAction => {
  return {
    type: "USER_PROFILE_FAILURE",
    payload: error
  }
}

export const getLoggedInUser = () => {
  return async function (dispatch) {
    dispatch(getLoggedInUserBegin());
    try {
      const api = new UserApi({ basePath: "http://localhost:3001" });
      const user = await api.userControllerGetUser();
      dispatch(getLoggedInUserSuccess(user))
    }
    catch (error) {
      dispatch(getLoggedInUserFailure(error));
    }
  }
}

export const getUserForViewProfile = (username) => {
  return async function (dispatch) {
    dispatch(getUserForViewProfileBegin());
    try {
      const payload = null; // TOD
      dispatch(getUserForViewProfileSuccess(payload));
    }
    catch (error) {
      dispatch(getUserForViewProfileError(error));
    }
  }
}