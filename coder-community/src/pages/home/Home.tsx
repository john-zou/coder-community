import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import Main from "./Main";

const useStyles = makeStyles({
  root: {
    paddingTop: "7vh",
    paddingBottom: "7vh",
    display: "flex",
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LeftSideBar />
      <Main />
      <RightSideBar />
    </div>
  );
}
