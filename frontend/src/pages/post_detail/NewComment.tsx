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
    width: "100%",
    paddingLeft: "2em",
    height: "4em",
    marginBottom: "1em",
  },
  comment: {
    height: "7em",
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
      <PurpleButton content="Post"></PurpleButton>
    </form>
  );
};

export default NewComment;
