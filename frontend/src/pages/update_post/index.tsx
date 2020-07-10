import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ImgP from "./ImgPanel";
import TextP from "./TextPanel";
import TagP from "./TagPanel";
import Submit from "./Submit";
import {useParams} from "react-router-dom";
import {PostDetailParams} from "../../App";
import {PostWithDetails} from "../../../../backend/src/posts/dto/posts.dto";
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
    const classes = useStyles();
    const {slug} = useParams<PostDetailParams>(); //get the url param to render the appropriate post
    console.log("UPDATEPOST::INDEX");
    console.log(slug);
    const postID = useSelector<RootState, string>(
        (state) => state.posts.slugToID[slug]
    );
    console.log(postID);
    const oldPost = useSelector<RootState, Post>(
        (state) => state.posts.entities[postID]
    );

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [featuredImg, setImg] = useState('');

    // const old: Promise<PostWithDetails> =
    /*
    fetch(`http://localhost:3001/api/posts/${slug}`)
        .then((response) => {
            return response.json();
        }).then((res) => {
            console.log("FOUND");
            console.log(res);

        }).catch(e => console.log(e));
    */
    return (
        <div className={classes.updatePost}>
            <ImgP setImg={setImg} img={oldPost.featuredImg} />
            <TextP setTitle={setTitle} setContent={setContent} title={oldPost.title} content={oldPost.content}/>
            <TagP setTags={setTags} tags={oldPost.tags} />
            <Submit title={title} content={content} tags={tags} img={featuredImg} />
        </div>
    )
}
