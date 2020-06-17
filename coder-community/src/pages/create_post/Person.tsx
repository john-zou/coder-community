import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import EmailIcon from '@material-ui/icons/AlternateEmail';

const useStyles = makeStyles((theme) => ({
  p: {
    margin: theme.spacing(0),
  },
}));

export default function Person() {
  const classes = useStyles();
  return (
    <div>
      <Button color="secondary" className={classes.p} startIcon={<EmailIcon/>}>Angela Darlin
      </Button>
    </div>
  );
}
