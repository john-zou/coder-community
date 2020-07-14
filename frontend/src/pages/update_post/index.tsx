import React, {useEffect, useState} from "react";
import {Redirect, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {RootState} from "../../reducers/rootReducer";
import {Post, Tag} from "../../store/types";
import defaultPostFeaturedImage from "../../assets/defaultPostFeaturedImage.jpg";
import {fetchPostBySlug} from "../../reducers/postsSlice";
import {Loading} from "../common/Loading";
import {NotFoundError} from "../common/NotFoundError";
import ImgP from "../create_post/ImgPanel";
import TextP from "../create_post/TextPanel";
import AddMultiple from "../group/AddMuliple";
import Submit from "../create_post/Submit";
import {TagsContainer} from "../create_post/CreatePost";
import {makeStyles} from "@material-ui/core/styles";
import {Dictionary, unwrapResult} from "@reduxjs/toolkit";

const useStyles = makeStyles({
    createPost: {
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
    const { slug } = useParams<{ slug: string }>();
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();

    const allTags = useSelector<RootState, Dictionary<Tag>>(state => state.tags.entities);
    const allTagsArr = Object.values(allTags);


    const {post}  = useSelector<RootState, { post: Post }>(state => {
        const postID = state.posts.slugToID[slug];
        if (!postID) {
            return { post: null };
        }
        const post = state.posts.entities[postID];
        return {post};
    });

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.content);
    const [postTags, setPostTags] = useState(post?.tags);
    const [featuredImg, setImg] = useState(post?.featuredImg);

    const [error, setError] = useState(null);


    useEffect(() => {
        if (slug == null || slug === "") {
            return;
        }
        if (!post?.content) {
            dispatch(fetchPostBySlug({ slug, getAuthor: false }))
                .then(unwrapResult)
                .then(dto => {
                    setTitle(dto.post.title);
                    setContent(dto.post.content);
                    setPostTags(dto.post.tags);
                })
                .catch(setError);
        }
    }, []);

    if (slug == null || slug === "") {
        return <Redirect to="/" />
    }

    if (!post?.content) {
        return <Loading />
    }

    if (error) {
        return <NotFoundError />
    }

    return (
        <div className={classes.createPost}>
            <ImgP setImg={setImg} />
            <TextP setTitle={setTitle} setContent={setContent} title={post?.title} content={post?.content} />
            <TagsContainer>
                <AddMultiple label="Add Tags" options={allTagsArr} setItems={setPostTags} />
            </TagsContainer>
            <Submit title={title} content={content} tags={postTags} img={featuredImg} isUpdate={post?.slug}/>
        </div>
    );
}