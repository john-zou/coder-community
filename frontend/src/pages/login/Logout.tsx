import React, { useEffect } from 'react'
import { logout } from '../../actions/isLoggedIn';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function LogOut() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(logout());
    history.push('/');
  }, [])

  return <></>
}