import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import { Group, User } from "../../store/types";
import { RootState } from "../../reducers/rootReducer";
import { submitPost, updatePost } from "../../reducers/postsCreationSlice";
import { AppDispatch } from "../../store";
import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import PurpleButton from "../common/PurpleButton";
import { uploadPublicAsset } from "../../api-upload";
import { Loading } from "../common/Loading";
import ErrorPage from "../common/ErrorPage";
import Quill from "quill";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { fetchGroups } from "../../reducers/groupsSlice";
import "./PostContent.css"

const useStyles = makeStyles({
  operation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 0,
    marginTop: "20px",
  },
  selectEmpty: {
    marginTop: "1em",
  },
  formControl: {
    margin: "1em",
    minWidth: 120,
  },
});

export default function Submit(params: { editorRef, tags, img, title, isUpdate?}) {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const curUser = useSelector<RootState, User>(state => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitDest, setSubmitDest] = useState('')

  const groups = useSelector<RootState, Dictionary<Group>>(state => state.groups.entities)
  const userGroups = Object.values(groups).filter(group => curUser.groups.includes(group._id))

  useEffect(() => {
    dispatch(fetchGroups()).then(unwrapResult).then(() => {
    })
  }, [])


  const onCancel = () => {
    history.push("/home")
  }

  const onSubmit = async (params, author, dispatch, history, group?) => {
    let featuredImg: string;
    if (params.img) {
      featuredImg = await uploadPublicAsset(params.img);
    }

    const editor: Quill = params.editorRef.current;
    const newPost = {
      title: params.title,
      content: editor.root.innerHTML,
      tags: params.tags,
      featuredImg,
      author: author._id,
      group
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
          history.push(`/post/${dto.slug}`)

        }
      );
    }
  }

  const handleSubmitSelect = async (groupID) => {
    await onSubmit(params, curUser, dispatch, history, groupID)
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

      {/* SUBMIT BUTTON */}
      <div className="submitCreatePost">
        <FormControl variant="outlined" className={classes.formControl}>
          {params.isUpdate ? <div className="submitUpdatePost"><PurpleButton content="Update Post"
            handleClick={() => onSubmit(params, curUser, dispatch, history)} /> </div> :
            <>
              <InputLabel style={{ height: "100%" }}>Submit</InputLabel>
              <Select
                value={submitDest}
              >
                <MenuItem value={10} onClick={(event) => {
                  onSubmit(params, curUser, dispatch, history)
                }}>Post to my profile</MenuItem>

                <p style={{ textAlign: "center" }}>Post to my group</p>
                {userGroups.map(group => (
                  <MenuItem
                    value={group.name}
                    onClick={() => handleSubmitSelect(group._id)}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{group.name}
                  </MenuItem>
                ))}
              </Select>
            </>
          }
        </FormControl>
      </div>
    </div >
  );
}

