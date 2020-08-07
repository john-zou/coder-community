import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import { User } from "../../store/types";
import { RootState } from "../../reducers/rootReducer";
import { submitPost, updatePost } from "../../reducers/postsCreationSlice";
import { AppDispatch } from "../../store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import PurpleButton from "../common/PurpleButton";
import { uploadPublicAsset } from "../../api-upload";
import { Loading } from "../common/Loading";

const useStyles = makeStyles({
  operation: {
    display: "flex",
    flexDirection: "row",
    flex: 0,
    marginTop: "20px",
  }
});

const onCancel = (params, dispatch) => {
  const newPost = {
    title: params.title,
    content: params.content,
    tags: params.tags,
    featuredImg: params.img,
  }
}


export default function Submit(params) {
  console.log("UPDATEPOST::SUBMIT");
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const previewContentLength = 100;
  const updating = useSelector<RootState, boolean>(state => state.posts.updating)

  const curUser = useSelector<RootState, User>(state => state.user);
  const [loading, setLoading] = useState(false)
  const onSubmit = async () => {
    let featuredImg: string;
    if (params.img) {
      featuredImg = await uploadPublicAsset(params.img);
    }

    console.log(params.tags);
    const newPost = {
      title: params.title,
      content: params.content,
      tags: params.tags,
      featuredImg: featuredImg,
      author: curUser._id,
      previewContent: params.content.substring(0, previewContentLength),
    }
    // Handle update differently
    if (params.isUpdate) {
      setLoading(true)
      dispatch(updatePost({ update: newPost, slug: params.isUpdate })).then(unwrapResult).then(
        dto => {
          setLoading(false)
          if (!updating) {
            history.push(`/post/${dto.slug}`);
          }
        }
      );
    } else {
      // Create new post
      dispatch(submitPost(newPost))
        .then(unwrapResult)
        .then(dto => {
          history.push(`/post/${dto.slug}`)
        });
    }
  }

  if (loading) {
    return <Loading></Loading>
  }
  return (
    <div className={classes.operation}>
      <div onClick={(event) => {
        onCancel(params, dispatch);
      }}>
        <PurpleButton content="Cancel" />
      </div>
      <div style={{ width: "15px" }}></div>
      <PurpleButton content="Submit" handleClick={onSubmit} />
    </div>
  );
}
