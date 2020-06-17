import React from "react";
import GroupList from "./GroupList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "14vw",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "white",
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
});

export default function LeftSideBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.diplayAccount}>
        <img
          className={classes.displayImg}
          src="https://picsum.photos/200/200"
          alt=""
        />
        <h3 className={classes.displayName}>Nick Lee</h3>
      </div>
      <div className={classes.groupLinks}>
        <h3>Daily Challenge</h3>
        <h3>Messages</h3>
        <h3>Saved posts</h3>
        <GroupList />
      </div>
    </div>
  );
}
