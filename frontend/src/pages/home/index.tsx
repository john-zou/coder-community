import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from '../common/Loading';
import LeftSideBar from './LeftSideBar';
import Main from './Main';
import RightSideBar from './RightSideBar';
import { fetchTrendingPosts } from '../../reducers/postsSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import ErrorPage from '../common/ErrorPage';


const useStyles = makeStyles({
  home: {
    paddingTop: "7vh",
    display: "flex",
  },
});

export default function Home() {
  const classes = useStyles();
  const dispatch: any = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchTrendingPosts())
      .then(unwrapResult).then( //must set dispatch to any to use .then
        () => {
          setLoading(false)
        }
      ).catch(error => {
        setLoading(false);
        setError(error)
      });
  }, []);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <div className={classes.home}>
      <LeftSideBar />
      <Main />
      <RightSideBar />
    </div>
  );
}
