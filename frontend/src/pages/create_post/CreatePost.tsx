import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ImgP from "./ImgPanel";
import TextP from "./TextPanel";
import TagP from "./TagPanel";
import Submit from "./Submit";
import AddMultiple from "../group/AddMuliple";
import {RootState} from "../../reducers/rootReducer";
import {Dictionary} from "@reduxjs/toolkit";
import {Tag} from "../../store/types";
import {useSelector} from "react-redux";
import styled from '@emotion/styled';

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
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postTags, setPostTags] = useState([]);
    const [featuredImg, setImg] = useState('');
    const allTags = useSelector<RootState, Dictionary<Tag>>(state => state.tags.entities);
    const allTagsArr = Object.values(allTags);
    // console.log("CREATEPOST::INDEX");
    // console.log(allTags);
    // console.log(allTagsArr);
    // console.log(postTags);

    return (
        <div className={classes.createPost}>
            <ImgP setImg={setImg}/>
            <TextP setTitle={setTitle} setContent={setContent}/>
            <TagP setPostTags={setPostTags} allTagsArr={allTagsArr}/>
            <Submit title={title} content={content} tags={postTags} img={featuredImg}/>
        </div>
    );
}
