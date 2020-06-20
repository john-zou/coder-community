import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState, SavedPost, CurrentViewedPost } from "../../initialData";
import Avatar from "../common/Avatar";
import { Link } from "react-router-dom";
import { handleViewPost } from "./Card";
import { currentViewedPost } from "../../reducers/currentViewedPost";

const useStyles = makeStyles({
  root: {
    width: "20vw",
    display: "flex",
    flexDirection: "column",
    // height: "100%",
    cursor: "pointer",
    paddingLeft: "2em",
    paddingTop: "5vh",
    marginRight: "5vw",
  },
  // mostPopularSection: {
  //   height: "56vh",
  //   display: "flex",
  //   flexDirection: "column",
  //   overflowY: "scroll",
  // },
  savePostSection: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflowY: "scroll",
  },
  savePostText: {
    marginBottom: "-1px",
    borderBottom: "solid 1px lightgray",
    fontSize: "large",
    fontFamily: "Passion One, cursive",
    color: "#707070",
  },
  link: {
    textDecoration: "none",
  },
});

export default function RightSideBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currViewedPost = useSelector<RootState, CurrentViewedPost>(
    (state) => state.currentViewedPost
  );
  const savedPosts = useSelector<RootState, SavedPost[]>(
    (state) => state.savedPosts
  );

  return (
    <div className={classes.root}>
      <p className={classes.savePostText}># SAVED POSTS</p>
      <div className={classes.savePostSection}>
        {savedPosts.map((sp) => (
          <div key={sp.postID}>
            <Avatar post={sp} extraText=""></Avatar>
            <Link
              to={`/post/${sp.postID}`}
              className={classes.link}
              onClick={() => {
                handleViewPost(currViewedPost, sp, dispatch);
              }}
            >
              <p style={{ marginTop: "-0.5em", fontWeight: "bold" }}>
                {sp.title}
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* <p className={classes.savePostText}># MOST POPULAR</p>
      <div className={classes.mostPopularSection}></div> */}
    </div>
  );
}
