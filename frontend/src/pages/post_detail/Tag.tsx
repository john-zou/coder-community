import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Tag(tag) {
  const classes = useStyles();
  return (
    <div>
      <Button variant="contained" color="secondary" className={classes.button} >
        {tag.tag}
      </Button>
    </div>
  );
}
