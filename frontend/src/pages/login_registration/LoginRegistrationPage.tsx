import React from "react";
import { makeStyles } from "@material-ui/core";
import Login from "./Login";
import Register from "./Register";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "100vh",
  },
}));

export function LoginRegistrationPage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Login></Login>
      <Register></Register>
    </div>
  );
}
