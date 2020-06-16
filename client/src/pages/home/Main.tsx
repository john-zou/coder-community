import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card";

const useStyles = makeStyles({
  main: {
    paddingTop: "3em",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "90vh",
    alignItems: "center",
    overflowY: "scroll",
  },
});

export default function Main() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
