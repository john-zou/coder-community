import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import FilterPost from './FilterPost';
import { RootState } from '../../reducers/rootReducer';
import { User } from '../../store/types';
import { Loading } from '../common/Loading';
import { AppDispatch } from '../../store';
import { fetchGroups } from '../../reducers/groupsSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import ErrorPage from '../common/ErrorPage';

const useStyles = makeStyles({
  root: {
    width: "14vw",
    display: "flex",
    flexDirection: "column",
    height: "94vh",
    cursor: "pointer",
    paddingLeft: "7em",
  },
  diplayAccount: {
    display: "flex",
    flexDirection: "row",
  },
  displayImg: {
    width: "5em",
    height: "5em",
    borderRadius: "50%",
    marginTop: "2em",
    marginRight: "1em",
  },
  displayName: {
    marginTop: "3em",
    color: "#5DCBAF",
  },
  groupLinks: {
    marginTop: "2em",
  },
  showPostsText: {
    marginTop: "1em",
    borderBottom: "solid 1px lightgray",
    fontSize: "large",
    fontFamily: "Passion One, cursive",
    color: "#707070",
  },
  link: {
    textDecoration: "none",
  },
});

const LeftSideBar = ({ setGroupsVisible, setMainVisible }) => {
  const classes = useStyles();

  // const user = useSelector<RootState, User>(state => Object.values(state.user.entities)[0]);
  const user = useSelector<RootState, User>(state => state.user);
  const isLoggedIn = useSelector<RootState, boolean>(state => state.isLoggedIn);
  /*
  const user = useSelector<RootState, Loadable<User>>((state) => state.user);
  let isLoggedIn = useSelector<RootState, boolean>((state) => state.isLoggedIn);

  isLoggedIn = false;
   */

  /*
  if (!user) {
    return <Loading />
  }
  console.log(isLoggedIn);
   */
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!user) {
    return <Loading />
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <ErrorPage error={error} />
  }
  return (
    <div className={classes.root}>
      { /*isLoggedIn &&
        <div className={classes.diplayAccount}>
          <img className={classes.displayImg} src={user.profilePic} alt="" />
          <Link to={`/user/${user.userID}`} className={classes.link}>
            <h3 className={classes.displayName}>{user.name}</h3>
          </Link>
        </div> */
      }
      <div className={classes.groupLinks}>
        <h3>Daily Challenge</h3>
        {isLoggedIn &&
          <Link to={`/messages`} className={classes.link}>
            <h3>Messages</h3>
          </Link>
        }
        <h3>Hacker News</h3>
        <h3>Posts</h3>
        <h3>Videos</h3>

        <h3 onClick={() => {
          setGroupsVisible(true);
          setMainVisible(false);
          setLoading(true);
          dispatch(fetchGroups()).then(unwrapResult).then(() => {
            setLoading(false);
          }).catch(err => {
            setLoading(false);
            setError(error);
          })
        }}>Groups</h3>

        <p className={classes.showPostsText}># BROWSE BY TAGS</p>
        <FilterPost />
      </div>
    </div>
  );
};

export default LeftSideBar;
