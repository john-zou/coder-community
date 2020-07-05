import React from 'react'
import { useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/isLoggedIn';

export function DevLogin() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:3001/api/dev/login").then(res => res.json()).then(
      (res) => {
        dispatch(login(res.jwt));
        history.push("/");
      }
    )
  }, [])
  return (<h1>Logging in...</h1>);
}