import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ImgP from "./ImgPanel";
import TextP from "./TextPanel";
import TagP from "./TagPanel";
import Submit from "./Submit";
import {useParams} from "react-router-dom";
import {PostDetailParams} from "../../App";

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

const getOld = (slug) => {
    return dispatch => {
        return fetch(`http://localhost:3001/api/posts/${slug}`)
            .then((response) => {
                return response.json();
            }).then((res) => {
                // console.log(res);
                return res;
            }).catch(e => console.log(e));
    }
}

export default function UpdatePost() {
    const classes = useStyles();
    const {slug} = useParams<PostDetailParams>(); //get the url param to render the appropriate post
    const oldPost = getOld(slug);
    return (
        <div className={classes.updatePost}>
            {/* <ImgP img={oldPost.img} />
            <TextP title={oldPost.payload} />*/}
            <TagP/>
            <Submit/>
        </div>
    );
}
