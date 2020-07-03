import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import RightSideBar from "./RightSideBar";
import Main from "./Main";

const useStyles = makeStyles({
  home: {
    paddingTop: "7vh",
    display: "flex",
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <Main />
      <RightSideBar />
    </div>
  );
}
