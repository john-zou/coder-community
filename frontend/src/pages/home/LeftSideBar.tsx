import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loadable, RootState, User } from '../../store';
import FilterPost from './FilterPost';
import { Loading } from '../common/Loading';
import { fetchGroups } from '../../actions/groups';

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

const LeftSideBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector<RootState, Loadable<User>>((state) => state.user);
  const isLoggedIn = useSelector<RootState, boolean>((state) => state.isLoggedIn);

  if (!user.item || user.loading) {
    return <Loading />
  }
  return (
    <div className={classes.root}>
      {isLoggedIn &&
        <div className={classes.diplayAccount}>
          <img className={classes.displayImg} src={user.item.profilePic} alt="" />
          <Link to={`/user/${user.item.userID}`} className={classes.link}>
            <h3 className={classes.displayName}>{user.item.name}</h3>
          </Link>
        </div>
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
        <h3 onClick={() => dispatch(fetchGroups())}>Groups</h3>

        <p className={classes.showPostsText}># BROWSE BY TAGS</p>
        <FilterPost />
      </div>
    </div>
  );
};

export default LeftSideBar;
