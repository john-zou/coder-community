import React, { useEffect, useRef, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from "../../reducers/rootReducer";
import { Post, Tag, User } from "../../store/types";
import defaultPostFeaturedImage from "../../assets/defaultPostFeaturedImage.jpg";
import { fetchPostBySlug } from "../../reducers/postsSlice";
import { Loading } from "../common/Loading";
import { NotFoundError } from "../common/NotFoundError";
import { NoAccessibilityError } from "../common/NoAccessibilityError";
import { NotLoggedInError } from "../common/NotLoggedInError";
import ImgP from "../create_post/ImgPanel";
import TextP from "../create_post/TextPanel";
import TagP from "./TagPanel";
import { makeStyles } from "@material-ui/core/styles";
import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import { PostContent } from "../create_post/PostContent";
import Quill from "quill";
import Submit from "../create_post/Submit";

const useStyles = makeStyles({
  createPost: {
    paddingTop: "7vh",
    paddingBottom: "7vh",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "110vh",
    alignItems: "center",
  }

});

export default function UpdatePost() {
  const { slug } = useParams<{ slug: string }>();

  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const allTags = useSelector<RootState, Dictionary<Tag>>(state => state.tags.entities);
  const allTagsArr = Object.values(allTags);

  const { post } = useSelector<RootState, { post: Post }>(state => {
    const postID = state.posts.slugToID[slug];
    if (!postID) {
      return { post: null };
    }
    const post = state.posts.entities[postID];
    return { post }
  })

  // fetch tags
  const tags = useSelector<RootState, Dictionary<Tag>>(state => state.tags.entities);
  const tagsArray = Object.values(tags);
  let oldTagsIDArr = []
  if (post && post.tags && post.tags.length > 0) {
    const oldTagsSet = new Set(post.tags);
    for (let i = 0; i < tagsArray.length; i++) {
      if (oldTagsSet.has(tagsArray[i]._id))
        oldTagsIDArr.push(i);
    }
  }
  const user = useSelector<RootState, User>(state => state.user);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const [postTags, setPostTags] = useState(post?.tags);
  const [featuredImg, setImg] = useState(post?.featuredImg);
  const [error, setError] = useState(null);
  const editorRef = useRef<Quill>(null); //content

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

  if (!user) {
    return <NotLoggedInError />
  }
  if (user._id !== post.author) {
    return <NoAccessibilityError />
  }

  return (
    <div className={classes.createPost}>
      <ImgP setImg={setImg} />
      <PostContent editorRef={editorRef} setTitle={setTitle} currentPost={post} />
      <TagP setPostTags={setPostTags} allTagsArr={allTagsArr} oldTagsID={oldTagsIDArr} />
      <Submit title={title} editorRef={editorRef} tags={postTags} img={featuredImg} isUpdate={post?.slug} />
    </div>
  );
}