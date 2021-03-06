import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import { likePost, savePost, viewPost } from '../../actions/home.ts';
import DefaultPic from "../../assets/user.svg";
import CommentIcon from "../../icons/commentIcon.svg";
import HeartIcon from "../../icons/heartIcon.svg";
import HeartIconRed from "../../icons/heartIconRed.svg";
import { RootState } from "../../reducers/rootReducer";
import { Group, Post } from "../../store/types";
import { User } from "../../store/types";
import { Tag } from "../../store/types";
import { Dictionary } from "@reduxjs/toolkit";
import { toggleSavePost } from "../../reducers/userSlice";
import { useLikePost } from "../../hooks/useLikePost";
import { Loading } from "../common/Loading";
import { fetchPostByID } from "../../reducers/postsSlice";
import { Snackbar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import moment from "moment";
import { fetchGroups } from "../../reducers/groupsSlice";

const useStyles = makeStyles({
  root: {
    minHeight: "fit-content",
    display: "flex",
    flexDirection: "column",
    width: "40vw",
    backgroundColor: "white",
    marginBottom: "1em",
    marginTop: "3em",
    marginLeft: "3em",
    marginRight: "3em",
    borderRadius: "5px",
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
    boxShadow: "8px 8px 16px #d4d4d4, -8px -8px 16px #f5f5f5",
    "&:hover": {
      boxShadow: "8px 8px 16px #dcdcdc, -8px -8px 16px #dcdcdc",
    },
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
};

type Props = {
  postID: string;
};

//parent: Main
const Card = ({ postID }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const previewContent = useRef(null);

  const post = useSelector<RootState, Post>(
    (state) => {
      return state.posts.entities[postID];
    }
  );


  const { postIsLikedByUser, handleToggleLike } = useLikePost(post?._id);

  const authorID = post?.author;
  const author = useSelector<RootState, User>(
    (state) => state.users.entities[authorID]
  );
  const tags = useSelector<RootState, Dictionary<Tag>>(
    (state) => state.tags.entities
  );

  useEffect(() => {
    dispatch(fetchGroups())
  }, [])

  const groups = useSelector<RootState, Dictionary<Group>>(
    (state) => state.groups.entities
  );

  const user = useSelector<RootState, User>(state => state.user)

  const checkSavedPost = () => {
    return user?.savedPosts.includes(postID)
  }
  const [postAlreadySaved, setPostAlreadySaved] = useState(checkSavedPost());

  const toggleSave = () => {
    setSnackBarOpen(true);
    setPostAlreadySaved(prev => {
      return !prev
    })
  }

  useEffect(() => {
    if (!post) {
      dispatch(fetchPostByID({ id: postID, getAuthor: !author }));
    }
  }, [postID])

  useEffect(() => {
    if (post && post.content) {
      previewContent.current.innerHTML += post.previewContent
    }
  }, [post?.content])

  if (!post || !author || !groups) {
    return <Loading />
  }



  const handleSavePostToggle = () => {
    console.log("onClick save post", post.title);
    dispatch(toggleSavePost({ postID: post._id }));
    console.log("setting snackbar open to true");
    toggleSave()
  }

  const timeString = typeof post.createdAt === "string" ? post.createdAt : moment(post.createdAt).format("lll");

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

            {post.group && <Link to={`/group/${groups[post.group]._id}`} style={{ textDecoration: "none" }}>&nbsp;to&nbsp;{groups[post.group].name}</Link>}
          </p>
          <p style={{ marginTop: "-0.8em" }}>{timeString}</p>
        </div>
      </div>

      <div className={classes.imgTitle}>
        {post.featuredImg && <img
          src={post.featuredImg}
          style={{ marginTop: "10px", width: "200px", height: "200px", objectFit: "cover" }}
          alt=""
        />}
        <div>
          {/* PREVIEW CONTENT */}
          <div className="ql-snow" >
            <div className="ql-editor">
              <p style={{ marginLeft: "2em" }} ref={previewContent}></p>
            </div>
          </div>

          <div className={classes.readSave}>
            <Link to={`/post/${post.slug}`} className={classes.link}>
              <h4
                style={{
                  marginLeft: "1em",
                  marginRight: "2em",
                  color: "#5D67E9",
                  textDecoration: "none",
                }}
              >
                View post
              </h4>
            </Link>

            <h4
              style={{ color: "#5D67E9", cursor: "pointer" }}
              onClick={handleSavePostToggle}
            >
              {postAlreadySaved ? `Unsave post` : `Save for later`}

            </h4>
          </div>
        </div>
      </div>

      <div className={classes.interactions}>
        {post.tags.length > 0 && post.tags.map((_id) => (
          <p key={_id} className={classes.tagText}>
            #{tags[_id].name}&nbsp;
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

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={() => {
          console.log("onCloseSnackbar ", post.title);
          setSnackBarOpen(false)
        }}
        message={postAlreadySaved ? "Post has been saved!" : "Post has been unsaved"}
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => {
              console.log("onCloseSnackbar IconButton ", post.title);
              setSnackBarOpen(false)
            }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
};

export default Card;