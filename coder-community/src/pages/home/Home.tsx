import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import Main from "./Main";

const useStyles = makeStyles({
  home: {
    paddingTop: "7vh",
    paddingBottom: "7vh",
    display: "flex",
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <LeftSideBar />
      <Main />
      <RightSideBar />
    </div>
  );
}
