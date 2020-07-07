import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../reducers/isLoggedInSlice';

export function LogOut() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(logout());
    history.push('/');
  }, [])

  return <></>
}