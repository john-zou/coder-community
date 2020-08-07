import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    backgroundColor: "#5D67E9",
    color: "white",
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

const PurpleButton = ({ handleClick, params, content, fitContent}: { handleClick?: (params) => any, params?: any, content: string, fitContent?: boolean }) => {
  const classes = useStyles();
  return <button onClick={handleClick} className={classes.root} style={{width: fitContent ? "fit-content" : "7em"}}>{content}</button>;
};
export default PurpleButton;
