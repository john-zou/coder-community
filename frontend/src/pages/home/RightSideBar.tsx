import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar';
import { handleViewPost } from './Card';
import { RootState } from '../../reducers/rootReducer';

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
  savePostSection: {
    display: "flex",
    flexDirection: "column",
    height: "50vh",
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

//parent:
export default function RightSideBar() {
  const classes = useStyles();
  const currViewedPost = null;

  const savedPosts = [
    {
      postID: "5f00faca1a9b9b1781929025", author: "fred", title: "sad", previewContent: "It is sad", content: "It is so sad", tags: [ "cpp", "html" ], featuredImg: "", likesCount: 100, comments: "this is a comment", commentsCount: 100, views: 10, createdAt: "created here", likedByUser: true, slug: "slug", group: "group"
    }
  ];
  let isLoggedIn = useSelector<RootState, boolean>((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  isLoggedIn = true;

  return (
    <div className={classes.root}>
      {isLoggedIn && <div>
        <p className={classes.savePostText}># TRENDING POSTS</p>
        <div className={classes.savePostSection}>
          {savedPosts.map((sp) => (
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
          ))}
        </div>

        <p className={classes.savePostText}># WHO TO FOLLOW</p>
      </div>}

    </div>
  );
}
