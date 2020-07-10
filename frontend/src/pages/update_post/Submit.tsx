import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import {CurrentLoggedInUser, PostsCreation, User} from "../../store/types";
import { RootState } from "../../reducers/rootReducer";
import { CreatePostBodyDto } from "../../../../backend/src/posts/dto/posts.dto";
import { UserObjectID } from '../../../../backend/src/user/user-object-id.decorator';
import { submitPost, updatePost } from "../../reducers/postsCreationSlice";

const useStyles = makeStyles({
    operation: {
        display: "flex",
        flex: 0
    }
});

const onSubmit = (params, slug, dispatch) => {
    const newPost = {
        title: params.title,
        content: params.content,
        tags: params.tags,
        featuredImg: params.img,
        slug: slug
    }
    // console.log(newPost);
    dispatch(updatePost(newPost));
}

const onCancel = (params, dispatch) => {

}

export default function Submit(params) {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const createdPost = useSelector<RootState, PostsCreation>(state => state.postsCreation);
    // const curUser = useSelector<RootState, User>(state => state.user);
    // console.log(curUser);

    console.log("UPDATEPOST::SUMIT");
    console.log(params.slug);
    return (
        <div className={classes.operation}>
            <button color="primary" onClick={(event) => {
                onCancel(params, dispatch);
            }}>Cancel</button>
            <button color="primary" onClick={(event) =>{
                onSubmit(params, params.slug, dispatch);
            }}>Submit</button>
        </div>
    );
}
