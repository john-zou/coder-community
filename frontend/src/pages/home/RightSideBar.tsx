import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { TinyButton as ScrollUpButton } from "react-scroll-up-button"; //https://www.npmjs.com/package/react-scroll-up-button
import "./TagsCarousel.css";

const useStyles = makeStyles({
  root: {
    width: "20vw",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    paddingLeft: "2em",
    paddingTop: "12vh",
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

  return (
    <div className={classes.root}>
      {isLoggedIn && <div>
        <p className={classes.savePostText}># TRENDING POSTS</p>
        <div className={classes.savePostSection}>
          {/* {savedPosts.map((sp) => (
            <div key={sp.postID}>
              <Avatar post={sp} extraText=""></Avatar>
              <Link
                to={`/post/${sp.postID}`}
                className={classes.link}
                onClick={() => {
                  handleViewPost(currViewedPost, sp);
                }}
              >
                <p style={{ marginTop: "-0.5em", fontWeight: "bold" }}>
                  {sp.title}
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
