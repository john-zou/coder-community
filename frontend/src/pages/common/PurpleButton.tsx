import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    backgroundColor: "#5D67E9",
    color: "white",
    width: "5em",
    height: "3em",
    border: "none",
    borderRadius: "10px",
  },
});

const PurpleButton = ({ content }: { content: string }) => {
  const classes = useStyles();
  return <button className={classes.root}>{content}</button>;
};
export default PurpleButton;
