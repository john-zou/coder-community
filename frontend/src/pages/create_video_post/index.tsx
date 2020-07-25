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
import VideoP from "../create_video_post/VideoPanel";
import TextP from "../create_post/TextPanel";
import AddMultiple from "../group/AddMuliple";
import Submit from "../create_post/Submit";
import {TagsContainer} from "../create_post/CreatePost";
import {makeStyles} from "@material-ui/core/styles";
import {Dictionary, unwrapResult} from "@reduxjs/toolkit";
import VideoRecorder from 'react-video-recorder'
import styled from "@emotion/styled";
import ImgP from "../create_post/ImgPanel";
import {ScreenRecorder} from "./ScreenRecorder";
import VideoUpload from "./VideoUpload";
import {uploadPublicAsset} from "../../api-upload";
import RecordUpload from './RecordUpload';

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

export default function CreateVideoPost() {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postTags, setPostTags] = useState([]);
    // const [url, setUrl] = useState('');
    const allTags = useSelector<RootState, Dictionary<Tag>>(state => state.tags.entities);
    const allTagsArr = Object.values(allTags);

    // function submitVideo() {
        // const
    // }

    return (
        <div className={classes.createPost}>
            {/*<VideoP setUrl={setUrl}/>*/}
            <div
                className={"root"}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "3em",
                    height: "33vh",
                    width: "42vw",
                    backgroundColor: "white",
                    // boxShadow: "3px 3px #F2F2F2",
                    // marginBottom: "1em",
                    borderRadius: "5px",
                    paddingLeft: "1.5em",
                    paddingRight: "1.5em",
                }}
            >
            <TextP
                setTitle={setTitle}
                setContent={setContent}
            />
            </div>

            <div
                // className={"root"}
                style={{
                    marginTop: "1em",
                    display: "flex",
                    flexDirection: "column",
                    // height: "10",
                    width: "40vw",
                    backgroundColor: "white",
                    boxShadow: "3px 3px #F2F2F2",
                    marginBottom: "1em",
                    borderRadius: "5px",
                    paddingLeft: "1.5em",
                    paddingRight: "1.5em",
                    paddingBottom: "1.5em",
                }}
            >
                <RecordUpload/>
            </div>
            <div
                className={"root"}
                style={{
                    // display: "flex",
                    // flexDirection: "column",
                    marginTop: "2em",
                    // marginBottom: "5em",
                    height: "90vh",
                    // width: "42vw",
                    // backgroundColor: "white",
                    // // boxShadow: "3px 3px #F2F2F2",
                    // // marginBottom: "1em",
                    // borderRadius: "5px",
                    // paddingLeft: "1.5em",
                    // paddingRight: "1.5em",
                }}
            >
                <VideoP />
            </div>
            <TagsContainer
                style={{
                    marginTop: "3em",
                }}
            >
                <AddMultiple label="Add Tags" options={allTagsArr} setItems={setPostTags} />
            </TagsContainer>
            {/*<button onClick={submitVideo}/>*/}
            {/*<Submit title={title} content={content} tags={postTags} img={featuredImg} />*/}
            <Submit title={title} content={content} tags={postTags} />
        </div>
    );
}
