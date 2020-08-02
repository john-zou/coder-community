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
import ErrorPage from "../common/ErrorPage";
import { SubmitButton } from "./SubmitButton";

const useStyles = makeStyles({
  operation: {
    display: "flex",
    flexDirection: "row",
    flex: 0,
    marginTop: "20px",
  }
});

export default function Submit(params) {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  // const createdPost = useSelector<RootState, PostsCreation>(state => state.postsCreation);
  const curUser = useSelector<RootState, User>(state => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onCancel = () => {
    history.push("/home")
  }

  const onSubmit = async (params, author, dispatch, history) => {
    // console.log(newPost);
    let featuredImg: string;
    if (params.img) {
      featuredImg = await uploadPublicAsset(params.img);
    }

    const newPost = {
      title: params.title,
      content: params.content,
      tags: params.tags,
      featuredImg,
      author: author,
    }
    // Handle update differently
    if (params.isUpdate) {
      setLoading(true)
      dispatch(updatePost({ update: newPost, slug: params.isUpdate })).then(unwrapResult).then(
        dto => {
          setError(false)
          setLoading(false)
          history.push(`/post/${dto.slug}`)
        }
      ).catch(error => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
    } else {
      // Create new post
      dispatch(submitPost(newPost)).then(unwrapResult).then(
        dto => {
          console.log("CREATEPOST::SUBMIT");
          console.log(dto);
          history.push(`/post/${dto.slug}`)
        }
      );
    }
  }

  if (loading) {
    return <Loading></Loading>
  }
  if (error) {
    return <ErrorPage error={error}></ErrorPage>
  }
  return (
    <div className={classes.operation}>
      <div onClick={onCancel}>
        <PurpleButton content="Cancel" />
      </div>
      <div style={{ width: "15px" }}></div>
      <div onClick={(event) => {
        onSubmit(params, curUser, dispatch, history);
      }}>
        <SubmitButton />
      </div>
    </div>
  );
}

