import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import { likePost, savePost, viewPost } from '../../actions/home.ts';
import DefaultPic from "../../assets/user.svg";
import CommentIcon from "../../icons/commentIcon.svg";
import HeartIcon from "../../icons/heartIcon.svg";
import HeartIconRed from "../../icons/heartIconRed.svg";
import { RootState } from "../../reducers/rootReducer";
import { Post } from "../../store/types";
import { User } from "../../store/types";
import { Tag } from "../../store/types";
import { Dictionary } from "@reduxjs/toolkit";
import { savePost } from "../../reducers/userSlice";
import { useLikePost } from "../../hooks/useLikePost";

const useStyles = makeStyles({
  root: {
    minHeight: "fit-content",
    display: "flex",
    flexDirection: "column",
    width: "40vw",
    backgroundColor: "white",
    boxShadow: "3px 3px #F2F2F2",
    marginBottom: "1em",
    borderRadius: "5px",
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
  },
  account: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "1em",
  },
  accountImg: {
    width: "3em",
    height: "3em",
    borderRadius: "50%",
    marginTop: "0.5em",
  },
  imgTitle: {
    display: "flex",
    flexDirection: "row",
  },
  nameTime: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "0.5em",
  },
  interactions: {
    display: "flex",
    flexDirection: "row",
  },
  commentIcon: {
    marginLeft: "2em",
    width: "2em",
    marginBottom: "-1.5em",
  },
  heartIcon: {
    width: "2em",
  },
  interactionsIcons: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  readSave: {
    marginLeft: "2em",
    display: "flex",
    flexDirection: "row",
  },
  link: {
    textDecoration: "none",
  },
  tagText: {
    fontFamily: "Overpass Mono, monospace",
  },
});

export const handleViewPost = (post, dispatch) => {
  // use history.push instead -John
  // dispatch(viewPost(post));
};

type Props = {
  postID: string;
};

//parent: Main
const Card = ({ postID }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const post = useSelector<RootState, Post>(
    (state) => state.posts.entities[postID]
  );

  const { postIsLikedByUser, handleToggleLike } = useLikePost(post._id);

  const authorID = post.author;
  const author = useSelector<RootState, User>(
    (state) => state.users.entities[authorID]
  );
  const tags = useSelector<RootState, Dictionary<Tag>>(
    (state) => state.tags.entities
  );

  return (
    <div className={classes.root}>
      <div className={classes.account}>
        <img
          className={classes.accountImg}
          src={author.profilePic || DefaultPic}
          alt=""
        />
        <div className={classes.nameTime}>
          <p>
            <Link to={`/user/${author.userID}`} className={classes.link}>
              <span
                style={{
                  fontWeight: "bold",
                  color: "#5DCBAF",
                }}
              >
                {author.name}&nbsp;
              </span>
            </Link>
            posted&nbsp;
            <span style={{ fontWeight: "bolder" }}>
              <Link
                to={`/post/${post.slug}`}
                className={classes.link}
                onClick={() => {
                  handleViewPost(post, dispatch);
                }}
              >
                {post.title}
              </Link>
            </span>
          </p>
          <p style={{ marginTop: "-0.8em" }}>{post.createdAt}</p>
        </div>
      </div>

      <div className={classes.imgTitle}>
        <img
          src={post.featuredImg}
          style={{ marginTop: "10px", width: "200px", height: "200px" }}
          alt=""
        />
        <div>
          <p style={{ marginLeft: "2em" }}>{post.previewContent}</p>
          <div className={classes.readSave}>
            <Link
              to={`/post/${post._id}`}
              className={classes.link}
              onClick={() => {
                handleViewPost(post, dispatch);
              }}
            >
              <h4
                style={{
                  marginRight: "2em",
                  color: "#5D67E9",
                  textDecoration: "none",
                }}
              >
                Read more
              </h4>
            </Link>

            <h4
              style={{ color: "#5D67E9", cursor: "pointer" }}
              onClick={() => {
                dispatch(savePost({ postID: post._id }));
              }}
            >
              Save for later
            </h4>
          </div>
        </div>
      </div>

      <div className={classes.interactions}>
        {post.tags.map((_id) => (
          <p key={_id} className={classes.tagText}>
            #{tags[_id]}&nbsp;
          </p>
        ))}
        <div style={{ display: "flex", flex: 1 }}></div>
        <div className={classes.interactionsIcons}>
          <img
            className={classes.heartIcon}
            src={postIsLikedByUser ? HeartIconRed : HeartIcon}
            alt=""
            onClick={handleToggleLike}
          />
          <p>&nbsp;{post.likes}</p>
          <Link to={`/post/${post.slug}`} className={classes.link}>
            <img className={classes.commentIcon} src={CommentIcon} alt="" />
          </Link>
          <p>&nbsp;{post.commentsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
