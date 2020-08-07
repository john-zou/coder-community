import React, { useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import PurpleButton from "../common/PurpleButton";
import { createCommentPending } from "../../reducers/commentsSlice";

import { CreateCommentClientToServerDto } from "../../ws-dto/comments/dto/createComment.ws.dto";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../App";
import { RootState } from "../../reducers/rootReducer";
import { Loading } from "../common/Loading";
import { CreateDiscussionDto } from "../../api";

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
    alignContent: "",
    height: "5em",
  },
});

export const NewDiscussion = () => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() === '') {
      return;
    }
    const content = inputRef.current.value.trim();
  }

  return (
    <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
      <input
        className={`${classes.name} ${classes.comment}`}
        placeholder="Type discussion"
        ref={inputRef}
      />
      <PurpleButton content="Post"></PurpleButton>
    </form>
  );
};

export default NewDiscussion;
