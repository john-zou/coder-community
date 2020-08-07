import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { RootState } from "../../reducers/rootReducer";
import { Post, Tag } from "../../store/types";
import defaultPostFeaturedImage from "../../assets/defaultPostFeaturedImage.jpg";
import { fetchPostBySlug } from "../../reducers/postsSlice";
import { Loading } from "../common/Loading";
import { NotFoundError } from "../common/NotFoundError";
import VideoP from "../create_video_post/VideoPanel";
import TextP from "../create_post/TextPanel";
import AddMultiple from "../group/AddMuliple";
import Submit from "../create_video_post/Submit";
import { TagsContainer } from "../create_post/CreatePost";
import { makeStyles } from "@material-ui/core/styles";
import { Dictionary, unwrapResult } from "@reduxjs/toolkit";

import styled from "@emotion/styled";
import ImgP from "../create_post/ImgPanel";

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

export default function CreateVideoPost() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postTags, setPostTags] = useState([]);
  // const [url, setUrl] = useState('');
  const allTags = useSelector<RootState, Dictionary<Tag>>(state => state.tags.entities);
  const allTagsArr = Object.values(allTags);

  return (
    <div className={classes.createPost}>
      <VideoP />
      <TextP setTitle={setTitle} setContent={setContent} />
      <TagsContainer>
        <AddMultiple label="Add Tags" options={allTagsArr} setItems={setPostTags} />
      </TagsContainer>
      <Submit title={title} content={content} tags={postTags} />
    </div>
  );
}
