import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";

import PurpleButton from "../common/PurpleButton";
import {createCommentPending} from "../../reducers/commentsSlice";

import { CreateCommentClientToServerDto } from "../../ws-dto/comments/dto/createComment.ws.dto";
import {useDispatch} from "react-redux";
import { SocketContext } from "../../App";

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

const NewComment = ({postID}) => {
  const socket = useContext(SocketContext);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCommentDto: CreateCommentClientToServerDto = {
      content: e.target.value,
      // parentComment?: string;
      parentPost: postID,
      // parentVideo?: string;
      commentRoot: "post",
    };
    socket.current.emit('createComment', newCommentDto);
    dispatch(createCommentPending());
  }

  return (
    <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
      <input
        className={`${classes.name} ${classes.comment}`}
        placeholder="Type comment"
      />
      {/*<input className={classes.name} placeholder="Type comment" />*/}
      <PurpleButton content="Post comment"></PurpleButton>
    </form>
  );
};

export default NewComment;
