import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { RootState, User, IsLoggedIn } from "../../store/index-old";
import FilterPost from "./FilterPost";
import { Link } from "react-router-dom";

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
  const user = useSelector<RootState, User>((state) => state.user);
  const isLoggedIn = useSelector<RootState, IsLoggedIn>((state) => state.isLoggedIn);
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
        <h3>Daily Challenge</h3>
        {isLoggedIn &&
          <Link to={`/messages`} className={classes.link}>
            <h3>Messages</h3>
          </Link>
        }
        <h3>Hacker News</h3>
        <h3>Posts</h3>
        <h3>Videos</h3>
        <h3>Groups</h3>
        {/* <GroupList /> */}
        <p className={classes.showPostsText}># BROWSE BY TAGS</p>
        <FilterPost />
      </div>
    </div>
  );
};

export default LeftSideBar;
