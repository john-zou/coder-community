import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImgP from "./ImgPanel";
import TextP from "./TextPanel";
import TagP from "./TagPanel";
import PeopleP from "./PeoplePanel";

const useStyles = makeStyles({
  home: {
    paddingTop: "7vh",
    paddingBottom: "7vh",
    // paddingTop: "3em",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "110vh",
    alignItems: "center",
    // overflowY: "scroll",
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <ImgP/>
      <TextP/>
      <TagP/>
      <PeopleP/>
    </div>
  );
}
