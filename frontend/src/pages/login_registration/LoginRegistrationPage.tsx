import React, { useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Terminal from "react-console-emulator";

// Work in Progress

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "100vh",
  },
}));

type Command = {
  description: string;
  usage?: string;
  fn: () => string;
};

const WelcomeMessage = "Welcome to Coder Community! Type 'login' or 'register'";

const PromptLabel = "user@CC:~$";

export function LoginRegistrationPage() {
  const classes = useStyles();
  const [state, setState] = useState();

  const commands: { [key: string]: Command } = {
    login: {
      description: "Log into Coder Community",
      fn: () => "Welcome back!",
    },
    register: {
      description: "Register for Coder Community",
      fn: () => "Welcome to Coder Community!",
    },
  };

  return (
    <div className={classes.container}>
      <Terminal
        commands={commands}
        welcomeMessage={WelcomeMessage}
        promptLabel={PromptLabel}
        style={{ fontSize: "3rem", margin: 200 }}
      ></Terminal>
    </div>
  );
}
