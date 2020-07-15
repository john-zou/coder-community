import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import PurpleButton from "../common/PurpleButton";

const useStyles = makeStyles({
  root: {
    marginTop: "1em",
  },
  name: {
    fontSize: "medium",
    border: "none",
    borderRadius: "5px",
    width: "60%",
    paddingLeft: "2em",
    height: "3em",
    marginBottom: "1em",
  },
  comment: {
    height: "5em",
  },
});

const NewComment = () => {
  const classes = useStyles();
  return (
    <form className={classes.root}>
      <input
        className={`${classes.name} ${classes.comment}`}
        placeholder="Type comment"
      />
      <input className={classes.name} placeholder="Name" />
      <PurpleButton content="Post comment"></PurpleButton>
    </form>
  );
};

export default NewComment;
