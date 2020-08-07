import React, { useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

import PurpleButton from "../common/PurpleButton";
import { createCommentPending } from "../../reducers/commentsSlice";

import { CreateCommentClientToServerDto } from "../../ws-dto/comments/dto/createComment.ws.dto";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../App";
import { RootState } from "../../reducers/rootReducer";
import { Loading } from "../common/Loading";

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

const NewComment = ({ postID }) => {
  const socket = useContext(SocketContext);
  const classes = useStyles();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const createPending = useSelector<RootState, boolean>(state => state.comments.isLoading);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim() === '') {
      return;
    }
    const content = inputRef.current.value.trim();
    const newCommentDto: CreateCommentClientToServerDto = {
      content,
      parentPost: postID,
      commentRoot: "post",
    };
    socket.current.emit('createComment', newCommentDto);
    dispatch(createCommentPending());
  }

  if (createPending) {
    return <Loading />
  }

  return (
    <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
      <input
        className={`${classes.name} ${classes.comment}`}
        placeholder="Type comment"
        ref={inputRef}
      />
      <PurpleButton content="Comment"></PurpleButton>
    </form>
  );
};

export default NewComment;
