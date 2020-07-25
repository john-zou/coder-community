import React from 'react'
import { useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../reducers/isLoggedInSlice';

export function DevLogin() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://ec2-13-229-215-75.ap-southeast-1.compute.amazonaws.com/api/dev/login").then(res => res.json()).then(
      (res) => {
        const jwt: string = res.jwt;
        dispatch(loginSuccess({jwt}));
        history.push("/");
      }
    )
  }, [])
  return (<h1>Logging in...</h1>);
}