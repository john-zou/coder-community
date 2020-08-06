import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { TinyButton as ScrollUpButton } from "react-scroll-up-button"; //https://www.npmjs.com/package/react-scroll-up-button
import "./TagsCarousel.css";
import { Dictionary } from '@reduxjs/toolkit';
import { Post, User } from '../../store/types';
import Avatar from '../common/Avatar';

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
    height: "90vh",
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

  /*
  const currViewedPost = null;
  const savedPosts = [
    {
      postID: "5f00faca1a9b9b1781929025", author: "fred", title: "sad", previewContent: "It is sad", content: "It is so sad", tags: [ "cpp", "html" ], featuredImg: "", likesCount: 100, comments: "this is a comment", commentsCount: 100, views: 10, createdAt: "created here", likedByUser: true, slug: "slug", group: "group"
    }
  ];
  let isLoggedIn = useSelector<RootState, boolean>((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  isLoggedIn = true;
  */
  const isLoggedIn = useSelector<RootState, boolean>((state) => state.isLoggedIn);
  const popularPosts = useSelector<RootState, string[]>(
    (state) => state.posts.popularPosts
  );

  const posts = useSelector<RootState, Dictionary<Post>>(
    (state) => state.posts.entities
  );
  const users = useSelector<RootState, Dictionary<User>>(
    (state) => state.users.entities
  );
  return (
    <div className={classes.root}>
      {isLoggedIn && <div>
        <p className={classes.savePostText}># POPULAR</p>
        <div className={classes.savePostSection}>
          {popularPosts.map((_id, idx) => (
            <div key={idx}>
              <Avatar pic={users[posts[_id].author].profilePic}
                title={posts[_id].title}
                subtitle={posts[_id].content.substr(0, 60).concat("...")}
                isButton={false} isPost={true}
                extraText={posts[_id].createdAt}
                titleSrc={`/post/${posts[_id].slug}`}
              ></Avatar>

            </div>
          ))}
        </div>

        {/* <p className={classes.savePostText}># WHO TO FOLLOW</p> */}
        <ScrollUpButton />
      </div>}

    </div>
  );
}
