import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { RootState, SavedPost } from "../../initialData";
import Avatar from "../common/Avatar";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "20vw",
    display: "flex",
    flexDirection: "column",
    height: "96vh",
    cursor: "pointer",
    paddingLeft: "2em",
    paddingTop: "5vh",
    marginRight: "5vw",
    overflowY: "scroll",
  },
  savePostText: {
    marginBottom: "-0.2em",
    borderBottom: "solid 1px lightgray",
  },
  link: {
    textDecoration: "none",
  },
});

export default function RightSideBar() {
  const classes = useStyles();
  const savedPosts = useSelector<RootState, SavedPost[]>(
    (state) => state.savedPosts
  );

  return (
    <div className={classes.root}>
      <h3 className={classes.savePostText}># Saved posts</h3>
      {savedPosts.map((sp) => (
        <div key={sp.postID}>
          <Avatar post={sp} extraText=""></Avatar>
          <Link to={`/post/${sp.postID}`} className={classes.link}>
            <p style={{ marginTop: "-0.5em", fontWeight: "bold" }}>
              {sp.title}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
