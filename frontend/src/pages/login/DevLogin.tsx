import React from 'react'
import { useEffect } from "react"
import { LoginSuccess } from '../../api';
import { useHistory } from 'react-router-dom';

export function DevLogin() {
  const history = useHistory();
  useEffect(() => {
    fetch("localhost:3001/api/login/dev").then(res => res.json()).then(
      (res) => {
        localStorage.setItem("ccjwt", (res as LoginSuccess).jwt);
        localStorage.setItem("userID", (res as LoginSuccess).userID);
        history.push("/");
      }
    )
  })
  return (<h1>Logging in...</h1>);
}