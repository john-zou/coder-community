import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../reducers/rootReducer';
import { CurrentLoggedInUser, User } from '../../store/types';
import { Loading } from '../common/Loading';
import "../../App.css";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles({
  root: {
    width: "14vw",
    display: "flex",
    flexDirection: "column",
    height: "93vh",
    cursor: "pointer",
    paddingLeft: "7em",
    position: "fixed",
    marginLeft: "5vw",
    marginTop: "7vh",
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
    marginTop: "4em",
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
  const dailyChallengeUuid = useMemo<string>(() => uuidv4(), []); // randomly generated
  const codeTogetherUuid = useMemo<string>(() => uuidv4(), []);

  const classes = useStyles();
  const user = useSelector<RootState, CurrentLoggedInUser>(state => state.user);
  const isLoggedIn = useSelector<RootState, boolean>(state => state.isLoggedIn);

  const history = useHistory(); //to redirect to different route (from current route)

  if (!user) {
    return <Loading />
  }

  return (
    <div className={classes.root}>
      {isLoggedIn &&
        <div className={classes.diplayAccount}>
          <img className={classes.displayImg} src={user.profilePic} alt="" />
          <Link to={`/user/${user.userID}`} className={classes.link}>
            <h3 className={classes.displayName}>{user.name}</h3>
          </Link>
        </div>
      }
      <div className={classes.groupLinks}>
        <Link to={`/code-together/${codeTogetherUuid}`} className={classes.link}>
          <h3>Code Together</h3>
        </Link>
        {isLoggedIn &&
          <Link to={`/messages`} className={classes.link}>
            <h3>Messages</h3>
          </Link>
        }
        <h3 onClick={() => {
          history.push("/home/hackernews")
        }}>Hacker News</h3>

        <h3 onClick={() => {
          history.push("/home/groups");
        }}>Groups</h3>
      </div>
    </div>
  );
};

export default LeftSideBar;
