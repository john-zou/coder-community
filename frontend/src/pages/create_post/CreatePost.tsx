import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImgP from "./ImgPanel";
import TextP from "./TextPanel";
import TagP from "./TagPanel";
import Submit from "./Submit";
import AddMultiple from "../group/AddMuliple";
import { RootState } from "../../reducers/rootReducer";
import { Dictionary } from "@reduxjs/toolkit";
import { Tag } from "../../store/types";
import { useSelector } from "react-redux";
import styled from '@emotion/styled';
import { PostContent } from "./PostContent";
import Quill from "quill";

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

export const TagsContainer = styled.div`
  background-color: white;
  width: 49em;
  height: 20vh;
  display: flex;
  box-shadow: 3px 3px #F2F2F2;
  border-radius: 5px;
  padding-left: 2em;
  padding-top: 1em;
`;
export default function CreatePost() {
  const classes = useStyles();
  const [postTags, setPostTags] = useState([]);
  const [featuredImg, setImg] = useState('');
  const allTags = useSelector<RootState, Dictionary<Tag>>(state => state.tags.entities);
  const allTagsArr = Object.values(allTags);
  const editorRef = useRef<Quill>(null); //content
  const [title, setTitle] = useState('')
  // console.log("CREATEPOST::INDEX");
  // console.log(allTags);
  // console.log(allTagsArr);
  console.log(title);

  return (
    <div className={classes.createPost}>
      <ImgP setImg={setImg} />
      {/* <TextP setTitle={setTitle} setContent={setContent}/> */}
      <PostContent editorRef={editorRef} setTitle={setTitle} />
      <TagP setPostTags={setPostTags} allTagsArr={allTagsArr} />
      <Submit title={title} editorRef={editorRef} tags={postTags} img={featuredImg} />
    </div>
  );
}
