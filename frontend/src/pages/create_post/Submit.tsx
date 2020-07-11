import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from 'react-redux';
import {User} from "../../store/types";
import {RootState} from "../../reducers/rootReducer";
import {submitPost, updatePost} from "../../reducers/postsCreationSlice";

const useStyles = makeStyles({
  operation: {
    display: "flex",
    flex: 0
  }
});

const onSubmit = (params, author, dispatch) => {
    const newPost = {
        title: params.title,
        content: params.content,
        tags: params.tags,
        featuredImg: params.img,
        author: author,
    }
    console.log(newPost);
    dispatch(submitPost(newPost));
}

const onCancel = (params, dispatch) => {
    const newPost = {
        title: params.title,
        content: params.content,
        tags: params.tags,
        featuredImg: params.img,
    }
    console.log("SUBMIT" + newPost);
    dispatch(updatePost(newPost));
}

const _onCancel = (event) => {}

export default function Submit(params) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const createdPost = useSelector<RootState, PostsCreation>(state => state.postsCreation);
  const curUser = useSelector<RootState, User>(state => state.user);
  console.log(curUser);

  return (
     <div className={classes.operation}>
        <button color="primary" onClick={(event) => {
            onCancel(params, dispatch);
        }}>Cancel</button>
        <button color="primary" onClick={(event) =>{
            onSubmit(params, curUser, dispatch);
        }}>Submit</button>
     </div>
  );
}
