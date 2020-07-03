import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HeartIcon from "../../icons/heartIcon.svg";
import HeartIconRed from "../../icons/heartIconRed.svg";
import CommentIcon from "../../icons/commentIcon.svg";
import { Post, RootState, User } from "../../store";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePost, likePost, viewPost } from "../../actions/home";
import DefaultPic from "../../assets/user.svg";

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

export const handleViewPost = (
  post,
  dispatch
) => {
  dispatch(viewPost(post));
};

type Props = {
  postID: string;
};
//parent: 
const Card = ({ postID }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector<RootState, Post>(state => state.posts[postID]);

  const authorID = post.author;
  //backend should have author information inside post, save author in users, post in posts
  const author = useSelector<RootState, User>(state => state.users[authorID]);

  return (
    <div className={classes.root}>
      <div className={classes.account}>
        <img
          className={classes.accountImg}
          src={author.profilePic && DefaultPic}
          alt=""
        />
        <div className={classes.nameTime}>
          <p>
            <Link
              to={`/user/${author._id}`}
              className={classes.link}
            >
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
                to={`/post/${post._id}`}
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
                dispatch(savePost(post));
              }}
            >
              Save for later
            </h4>
          </div>
        </div>
      </div>

      <div className={classes.interactions}>
        {post.tags.map((tag) => (
          <p key={post._id} className={classes.tagText}>
            #{tag}&nbsp;
          </p>
        ))}
        <div style={{ display: "flex", flex: 1 }}></div>
        <div className={classes.interactionsIcons}>
          <img
            className={classes.heartIcon}
            src={post.likedByUser ? HeartIconRed : HeartIcon}
            alt=""
            onClick={() => {
              dispatch(likePost(post, !post.likedByUser));
            }}
          />
          <p>&nbsp;{post.likesCount}</p>
          <Link to={`/post/${post.slug}`} className={classes.link}>
            <img className={classes.commentIcon} src={CommentIcon} alt="" />
          </Link>
          <p>&nbsp;{post.comments}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
