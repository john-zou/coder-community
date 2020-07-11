import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from 'react-redux';
import {User} from "../../store/types";
import {RootState} from "../../reducers/rootReducer";
import { submitPost } from "../../reducers/postsCreationSlice";
import {AppDispatch} from "../../store";
import {unwrapResult} from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  operation: {
    display: "flex",
    flex: 0
  }
});

const onSubmit = (params, author, dispatch, history) => {
    const newPost = {
        title: params.title,
        content: params.content,
        tags: params.tags,
        featuredImg: params.img,
        author: author,
    }
    console.log(newPost);
    dispatch(submitPost(newPost)).then(unwrapResult).then(
        dto => {
            history.push(`/post/${dto.slug}`)
        }
    );
}

const onCancel = (params, dispatch) => {
    const newPost = {
        title: params.title,
        content: params.content,
        tags: params.tags,
        featuredImg: params.img,
    }
    console.log("SUBMIT" + newPost);
}


export default function Submit(params) {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  // const createdPost = useSelector<RootState, PostsCreation>(state => state.postsCreation);
  const curUser = useSelector<RootState, User>(state => state.user);
  console.log(curUser);

  return (
     <div className={classes.operation}>
        <button color="primary" onClick={(event) => {
            onCancel(params, dispatch);
        }}>Cancel</button>
        <button color="primary" onClick={(event) =>{
            onSubmit(params, curUser, dispatch, history);
        }}>Submit</button>
     </div>
  );
}
