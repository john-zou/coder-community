import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { TinyButton as ScrollUpButton } from "react-scroll-up-button"; //https://www.npmjs.com/package/react-scroll-up-button
import "./TagsCarousel.css";
import { Dictionary } from '@reduxjs/toolkit';
import { Post } from '../../store/types';

const useStyles = makeStyles({
  root: {
    width: "20vw",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    paddingLeft: "2em",
    paddingTop: "10vh",
    marginRight: "5vw",
    position: "fixed",
    right: 0,
  },
  savePostSection: {
    display: "flex",
    flexDirection: "column",
    height: "50vh",

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

//parent:
export default function RightSideBar() {
  const classes = useStyles();
  const isLoggedIn = useSelector<RootState, boolean>((state) => state.isLoggedIn);
  const trendingPosts = useSelector<RootState, string[]>(
    (state) => state.posts.trendingPosts
  );
  const posts = useSelector<RootState, Dictionary<Post>>(
    (state) => state.posts.entities
  );

  return (
    <div className={classes.root}>
      {isLoggedIn && <div>
        <p className={classes.savePostText}># POPULAR</p>
        <div className={classes.savePostSection}>
          {/* {trendingPosts.map((post) => (
            <div key={post.}>
              <Avatar post={post} extraText=""></Avatar>
              <Link
                to={`/post/${post.postID}`}
                className={classes.link}
                onClick={() => {
                  handleViewPost(currViewedPost, post);
                }}
              >
                <p style={{ marginTop: "-0.5em", fontWeight: "bold" }}>
                  {post.title}
                </p>
              </Link>
            </div>
          ))} */}
        </div>

        <p className={classes.savePostText}># WHO TO FOLLOW</p>
        <ScrollUpButton />
      </div>}

    </div>
  );
}
