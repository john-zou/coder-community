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
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const curUser = useSelector<RootState, User>(state => state.user);

  const onSubmit = async (params, author, dispatch, history) => {
    const newPost = {
      title: params.title,
      content: params.content,
      tags: params.tags,
      featuredImg: params.img,
      author: author,
    }
    // Handle update differently
    if (params.isUpdate) {
      dispatch(updatePost({ update: newPost, slug: params.isUpdate })).then(unwrapResult).then(
        dto => {
          history.push(`/post/${dto.slug}`)
        }
      );
    } else {
      // Create new post
      dispatch(submitPost(newPost)).then(unwrapResult).then(
        dto => {
          history.push(`/post/${dto.slug}`)
        }
      );
    }

  }

  return (
    <div className={classes.operation}>
      <div onClick={(event) => {
        onCancel(params, dispatch);
      }}>
        <PurpleButton content="Cancel" />
      </div>
      <div style={{ width: "15px" }}></div>
      <div onClick={(event) => {
        onSubmit(params, curUser, dispatch, history);
      }}>
        <PurpleButton content="Submit" />
      </div>
    </div>
  );
}
