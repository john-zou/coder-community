import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ImgP from "./ImgPanel";
import TextP from "./TextPanel";
import TagP from "./TagPanel";
import Submit from "./Submit";
import {useParams} from "react-router-dom";
import {PostDetailParams} from "../../App";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import {Post} from "../../store/types";

const useStyles = makeStyles({
    updatePost: {
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
    // TODO: Fetch the post from the server if it's not found
    // TODO: Only allow the post to be edited if its author is the logged in user

    const classes = useStyles();
    const {slug} = useParams<PostDetailParams>(); //get the url param to render the appropriate post

    const postID = useSelector<RootState, string>(
        (state) => state.posts.slugToID[slug]
    );

    const oldPost = useSelector<RootState, Post>(
        (state) => state.posts.entities[postID]
    );

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [featuredImg, setImg] = useState('');

    console.log(oldPost);

    return (
        <div className={classes.updatePost}>
            <ImgP setImg={setImg} img={oldPost.featuredImg} />
            <TextP setTitle={setTitle} setContent={setContent} title={oldPost.title} content={oldPost.content}/>
            <TagP setTags={setTags} tags={oldPost.tags} />
            <Submit title={title} content={content} tags={tags} img={featuredImg} slug={slug} />
        </div>
    );
}
