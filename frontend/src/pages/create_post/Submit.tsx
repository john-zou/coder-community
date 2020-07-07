import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import { PostsCreation } from "../../store/types";
import { RootState } from "../../reducers/rootReducer";
import {CreatePostBodyDto} from "../../../../backend/src/posts/dto/posts.dto";
import { UserObjectID } from '../../../../backend/src/user/user-object-id.decorator';

const useStyles = makeStyles({
  operation: {
    display: "flex",
    flex: 0
  }
});

const submitPost = createdPost => {
    let newPost: CreatePostBodyDto = {
        title: createdPost.title,
        content: createdPost.content,
        tags: createdPost.tags,
        featuredImg: ''
    }
    // console.log(newPost);
    return dispatch => {
        return fetch(`http://localhost:3001/api/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPost,
                user: { _id: '^&^&' }
            }),
            /*
            user: JSON.stringify( {
                _id: '',
            }),
             */
        }).then((response) => {
            return response.json();
        }).then((res) => {
            console.log(res);
        }).catch(e => console.log(e))
    }
}

const onSubmit = (createdPost, dispatch) => {
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
