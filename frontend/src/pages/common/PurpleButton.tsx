import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    backgroundColor: "#5D67E9",
    color: "white",
    width: "7em",
    // height: "2em",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
});

const PurpleButton = ({ handleClick, params, content }: { handleClick?: (params) => any, params?: any, content: string }) => {
  const classes = useStyles();
  return <button onClick={handleClick} className={classes.root}>{content}</button>;
};
export default PurpleButton;
