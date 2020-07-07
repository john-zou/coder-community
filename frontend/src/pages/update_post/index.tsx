import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ImgP from "./ImgPanel";
import TextP from "./TextPanel";
import TagP from "./TagPanel";
import Submit from "./Submit";
import {useParams} from "react-router-dom";
import {PostDetailParams} from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import {Post, User} from "../../store/types";
import {Dictionary} from "@reduxjs/toolkit";
import {fetchPostBySlug, fetchPostContentByID} from "../../reducers/postsSlice";
import {Loading} from "../common/Loading";
import {NotFoundError} from "../common/NotFoundError";

const useStyles = makeStyles({
    updatePost: {
        paddingTop: "7vh",
        paddingBottom: "7vh",
        // paddingTop: "3em",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        height: "110vh",
        alignItems: "center",
        // overflowY: "scroll",
    }
});

export default function UpdatePost() {
    const classes = useStyles();
    const {slug} = useParams<PostDetailParams>(); //get the url param to render the appropriate post

    const dispatch: any = useDispatch();
    const post = useSelector<RootState, Post>(state => {
        const postID = state.posts.slugToID[slug];
        console.log(postID);
        return state.posts[postID];
    });
    const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setLoading(true);
        if (!post) {
            dispatch(fetchPostBySlug(slug));
            return;
        }

        if (!post.content) {
            dispatch(fetchPostContentByID(post._id));
        }
    }, [post, slug, dispatch]);

    if (loading || !post || !post.content) {
        return <Loading/>
    }

    if (error) {
        return <NotFoundError/> // TODO: add something for server error
    }
    return (
        <div className={classes.updatePost}>
            <ImgP/>
            <TextP/>
            <TagP/>
            <Submit/>
        </div>
    );
}
