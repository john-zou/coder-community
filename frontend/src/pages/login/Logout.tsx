import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../reducers/isLoggedInSlice';

export function LogOut() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(logOut());
    history.push('/');
  }, [])

  return <></>
}