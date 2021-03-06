import React, {useContext, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import qs from "qs";
import {stateContainer} from "./login";
import {AuthApi} from "../../api";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../reducers/isLoggedInSlice";
import {AppDispatch} from "../../store";
import {JwtLocalStorageKey} from "../../constants";
import {SocketContext} from "../../App";

export function LoginGitHub() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);

  const parsed = qs.parse(location.search);
  const code = parsed["?code"];
  const state = parsed["state"];

  const expectedState = stateContainer.state;

  if ((state as string) !== expectedState) {
    console.log("Got back different state from GitHub OAuth!");
  }

  useEffect(() => {
    new AuthApi()
      .authControllerLoginGitHub({
        code: code as string,
        state: state as string,
      })
      .then((loginSuccessDto) => {
        dispatch(loginSuccess(loginSuccessDto));
        console.log('Authenticating...'); // true
        // Send server the JWT so it can authenticate ther user
        socket.current.emit('authenticate', { jwt: loginSuccessDto.jwt });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!code || !state) {
    history.push("/");
  }

  return <h1>Hello... we are waiting for the back end to respond!</h1>;
}
