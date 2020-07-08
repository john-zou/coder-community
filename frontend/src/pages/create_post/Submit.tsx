import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import {CurrentLoggedInUser, PostsCreation, User} from "../../store/types";
import { RootState } from "../../reducers/rootReducer";
import {CreatePostBodyDto} from "../../../../backend/src/posts/dto/posts.dto";
import { UserObjectID } from '../../../../backend/src/user/user-object-id.decorator';

const useStyles = makeStyles({
  operation: {
    display: "flex",
    flex: 0
  }
});

let curUser;
const submitPost = createdPost => {
    let newPost: CreatePostBodyDto = {
        title: createdPost.title,
        content: createdPost.content,
        tags: createdPost.tags,
        featuredImg: ''
    }
    return dispatch => {
        return fetch(`http://localhost:3001/api/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPost,
                user: { _id: "5eeebd4d1333dd0f79ca9be3" } //curUser._id }
            }),
        }).then((response) => {
            return response.json();
        }).then((res) => {
            console.log(res);
        }).catch(e => console.log(e))
    }
}

const testUpdatePost = createdPost => {
    let newPost: CreatePostBodyDto = {
        title: createdPost.title,
        content: createdPost.content,
        tags: createdPost.tags,
        featuredImg: ''
    }

    return dispatch => {
        return fetch(`http://localhost:3001/api/posts`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newPost,
                // user: { _id: "5eeebd4d1333dd0f79ca9be3" } //curUser._id }
            }),
            /*
        }).then((response) => {
            return response.json();
        }).then((res) => {
            console.log(res);
             */
        }).catch(e => console.log(e))
    }
}

// const onSubmit = (createdPost, dispatch) => {
const onSubmit = (params, dispatch) => {
    const newPost = {
        title: params.title,
        content: params.content,
        tags: params.tags,
        featuredImg: params.img,
    }
    console.log(newPost);
    dispatch(submitPost(newPost));
}


const onCancel = (newPost, dispatch) => {
    dispatch(testUpdatePost(newPost));
}

const _onCancel = (event) => {}

export default function Submit(params) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const createdPost = useSelector<RootState, PostsCreation>(state => state.postsCreation);
  // curUser = useSelector<RootState, User>(state => state.user);
  // console.log(curUser);

  return (
     <div className={classes.operation}>
        <button color="primary" onClick={(event) => {
            /* onCancel(createdPost, dispatch); */
        }}>Cancel</button>
        <button color="primary" onClick={(event) =>{
            onSubmit(params, dispatch);
        }}>Submit</button>
     </div>
  );
}
