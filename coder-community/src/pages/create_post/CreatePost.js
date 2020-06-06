import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImgP from "./ImgPanel.js";
import TextP from "./TextPanel.js";
import TagP from "./TagPanel.js";
import "./CreatePost.css";

const useStyles = makeStyles({
  newpost: {
    paddingTop: "7vh",
    paddingBottom: "7vh",
    display: "flex",
  },
});

export default function CreatePost() {
    const classes = useStyles();
    return (
	    <div id="container">
	    <ImgP/>
	    <TextP/>
	    <TagP/>
	    </div>
    );
}
