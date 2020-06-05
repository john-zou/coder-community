import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: "20vw",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "white",
    height: "94vh",
    overflow: "scroll",
    cursor: "pointer",
    paddingLeft: "2em",
  },
});

export default function RightSideBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h3># Most popular</h3>
      <hr></hr>
      <h3># Recent Posts</h3>
    </div>
  );
}
