import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { submitPost } from '../../actions/postsCreation';
import { useSelector, useDispatch } from 'react-redux';
// import {PostsCreation, PostsCreationState, RootState, TagsState, User} from "../../store";

const useStyles = makeStyles({
  operation: {
    display: "flex",
    flex: 0
  }
});

const onSubmit = (createdPost, dispatch) => {
    // console.log("*** " + createdPost.title + " " + createdPost.content + " ***");
    dispatch(submitPost(createdPost));
}

const _onCancel = (event) => {}

export default function Submit() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const createdPost = useSelector<RootState, PostsCreation>(state => state.postsCreation);

  return (
     <div className={classes.operation}>
        <button color="primary" onClick={_onCancel}>Cancel</button>
        <button color="primary" onClick={(event) =>{
            onSubmit(createdPost, dispatch);
        }}>Submit</button>
     </div>
  );
}
