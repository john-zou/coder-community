import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { RootState, CurrentViewedPost } from "../../initialData";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import HeartIcon from "../../icons/heartIcon.svg";
import HeartIconRed from "../../icons/heartIconRed.svg";
import CommentIcon from "../../icons/commentIcon.svg";
import ShareIcon from "../../icons/shareIcon.svg";
import NewComment from "./NewComment";
import Avatar from "../common/Avatar";
import { likePost } from "../../actions/home";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  postDetail: {
    paddingTop: "10vh",
    paddingBottom: "7vh",
    width: "60vw",
    margin: "0 auto",
  },
  interactions: {
    display: "flex",
    flexDirection: "row",
  },
  shareIcon: {
    marginLeft: "2em",
    width: "1.5em",
  },
  heartIcon: {
    width: "1.3em",
  },
  interactionsIcons: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignContent: "center",
  },
});

const PostDetail = () => {
  const { postID } = useParams(); //get the url param to render the appropriate post
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector<RootState, CurrentViewedPost>(
    (state) => state.currentViewedPost
  );
  return (
    <div className={classes.root}>
      <div className={classes.postDetail}>
        <img
          src={post.featuredImg}
          style={{ height: "20em", objectFit: "cover", width: "100%" }}
        />
        <h1>{post.title}</h1>

        <Avatar post={post} extraText="follow"></Avatar>

        <p>{post.content}</p>

        <div className={classes.interactionsIcons}>
          <span>
            <img className={classes.heartIcon} src={post.likedByUser ? HeartIconRed : HeartIcon} alt="" onClick={() => {
              dispatch(likePost(post, !post.likedByUser));
            }} />
            &nbsp;&nbsp;{post.likes}
          </span>
          <span>
            <img className={classes.shareIcon} src={CommentIcon} alt="" />
            &nbsp;&nbsp;{post.comments.length}
          </span>
          <span>
            <img className={classes.shareIcon} src={ShareIcon} alt="" />
            &nbsp;&nbsp;Share
          </span>
        </div>

        <NewComment></NewComment>
        {post.comments.map((comment) => (
          <>
            <Avatar post={comment} extraText="reply"></Avatar>
            <p>{comment.comment}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
