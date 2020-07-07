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
import { AppDispatch } from '../../store';
import GroupTab from '../group';


const useStyles = makeStyles({
  home: {
    paddingTop: "7vh",
    display: "flex",
  },
  main: {
    marginTop: "3vh",
    display: "flex",
    flex: 1,
    marginBottom: "0",
    height: "120vh",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
  },
});

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [groupsVisible, setGroupsVisible] = useState(false);
  const [mainVisible, setMainVisible] = useState(true);
  // const [newsVisible, setNewsVisible] = useState(false);//TODO: show hackernews

  useEffect(() => {
    setLoading(true);
    dispatch(fetchTrendingPosts())
      .then(unwrapResult).then( //must set dispatch to any to use .then
        () => {
          setLoading(false)
        }
      ).catch(error => {
        console.log(error);
        setError(error);
        setLoading(false);
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
      <LeftSideBar setGroupsVisible={setGroupsVisible} setMainVisible={setMainVisible} />
      <div className={classes.main}>
        {groupsVisible && <GroupTab />}
        {mainVisible && <Main />}
      </div>
      <RightSideBar />
    </div>
  );
}
