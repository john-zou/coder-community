import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: "20vw",
    display: "flex",
    flexDirection: "column",
    height: "94vh",
    cursor: "pointer",
    paddingLeft: "2em",
    paddingTop: "10vh",
  },
});

export default function RightSideBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h3># Recent posts</h3>
      <h3># Saved posts</h3>
    </div>
  );
}
