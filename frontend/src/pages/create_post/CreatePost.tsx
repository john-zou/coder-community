import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ImgP from "./ImgPanel";
import TextP from "./TextPanel";
import TagP from "./TagPanel";
import PeopleP from "./PeoplePanel";
import Submit from "./Submit";

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

export default function CreatePost() {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [featuredImg, setImg] = useState('');

    return (
        <div className={classes.createPost}>
            <ImgP setImg={setImg}  />
            <TextP setTitle={setTitle} setContent={setContent} />
            <TagP setTags={setTags} />
            <Submit title={title} content={content} tags={tags} img={featuredImg}/>
        </div>
    );
}
