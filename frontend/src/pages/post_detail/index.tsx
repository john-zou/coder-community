import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useParams } from 'react-router-dom';
import { PostDetailParams } from '../../App';
import Avatar from '../common/Avatar';
import { Loading } from '../common/Loading';
import { NotFoundError } from '../common/NotFoundError';
import NewComment from './NewComment';
import UpdateButton from './UpdateButton';
import { RootState } from '../../reducers/rootReducer';
import { fetchPostBySlug } from '../../reducers/postsSlice';
import { CurrentLoggedInUser, Post, Tag, User } from '../../store/types';
import { AppDispatch } from '../../store';
import defaultPostFeaturedImage from "../../assets/defaultPostFeaturedImage.jpg";
import { PostsApi } from "../../api";
import { useLikePost } from "../../hooks/useLikePost";
import CommentIcon from "../../icons/commentIcon.svg";
import HeartIcon from "../../icons/heartIcon.svg";
import HeartIconRed from "../../icons/heartIconRed.svg";
import BookmarkEmpty from "../../icons/bookmarkEmpty.svg";
import { Comments } from "./Comments";
import TagP from "./TagPanel";
import { Dictionary } from "@reduxjs/toolkit";
import DeletePostButton from "./DeletePostButton";
import moment from 'moment';
import { fetchGroups } from '../../reducers/groupsSlice';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  postDetail: {
    paddingTop: "10vh",
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
    marginTop: "6vh",
  },
});

const Interactions = () => {
  return <> </>
}

const PostDetail = () => {
  const { slug } = useParams<PostDetailParams>(); //get the url param to render the appropriate post
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector<RootState, CurrentLoggedInUser>(state => state.user);
  const postContent = useRef(null);
  const { post, author } = useSelector<RootState, { post: Post, author: User }>(state => {

    const postID = state.posts.slugToID[slug];
    if (!postID) {
      return { post: null, author: null };
    }

    const post = state.posts.entities[postID];
    let author: User;
    if (post?.author === currentUser?._id) {
      author = currentUser
    } else {
      author = state.users.entities[post.author];
    }
    return { post, author };
  });

  const { postIsLikedByUser, handleToggleLike } = useLikePost(post?._id);

  // fetch tags
  const tags = useSelector<RootState, Dictionary<Tag>>(state => state.tags.entities);
  const tagsArr = post?.tags.map(tag => {
    return tags[tag].name;
  })

  let canUpdate = false; // if the current user is the author, show an 'update post' button
  if (author != null) {
    canUpdate = currentUser !== null && currentUser._id === author._id;
  }

  const [error, setError] = useState(null);

  let featuredImg: string;
  if (!post?.featuredImg) {
    featuredImg = defaultPostFeaturedImage;
  } else {
    featuredImg = post.featuredImg;
  }


  useEffect(() => {
    if (slug == null || slug === "") {
      return;
    }
    if (!post?.content) {
      // automatically increments view count in PostService
      dispatch(fetchPostBySlug({ slug, getAuthor: !author })).catch(setError);
    } else {
      // increment view count if don't need to fetch the post
      new PostsApi().postsControllerIncrementView(post._id).then(() => console.log("Already had post. Incremented view count.")).catch(console.log);
    }

  }, []);

  useEffect(() => {
    if (post && postContent.current) {
      postContent.current.innerHTML += post.content
    }
  }, [post?.content])

  if (slug == null || slug === "") {
    return <Redirect to="/" />
  }

  if (!post?.content || !author) {
    return <Loading />
  }

  if (error) {
    return <NotFoundError />
    // post has item with content
    let dateSubtitleInAvatar: string;
    if (typeof post.createdAt === "string") {
      const parsedInt = parseInt(post.createdAt);
      if (isNaN(parsedInt) || parsedInt < 10000) {
        // It may already be a human readable string
        dateSubtitleInAvatar = post.createdAt;
      } else {
        // it is a unix millis cast to a string
        dateSubtitleInAvatar = moment(new Date(parseInt(post.createdAt))).calendar()
      }
    } else {
      dateSubtitleInAvatar = moment(post.createdAt).calendar()
    }

    return (
      <div className={classes.root}>
        <div className={classes.postDetail}>
          <img
            src={featuredImg}
            style={{ height: "20em", objectFit: "cover", width: "100%" }} alt="featured"
          />

          {/* POST TITLE */}
          <h1>{post.title}</h1>

          <Link to={`/user/${author.userID}`} style={{ textDecoration: "none" }}>
            <Avatar pic={author.profilePic} title={author.userID} subtitle={dateSubtitleInAvatar} isPost={true}></Avatar>
          </Link>


          {/*/>
          {/* POST CONTENT */}
          <div className="ql-snow" >
            <TagP tags={tagsArr} />
            <div className="ql-editor">
              <div ref={postContent}></div>
            </div>
          </div>

          <Interactions />
          <div className={classes.interactionsIcons}>
            <span>
              <img className={classes.heartIcon} src={postIsLikedByUser ? HeartIconRed : HeartIcon} alt=""
                onClick={() => {
                  handleToggleLike()
                    ;
                }} />&nbsp;&nbsp;{post.likes}
            </span>
            <span>
              <img className={classes.shareIcon} src={CommentIcon} alt="" />
            &nbsp;&nbsp;{post.commentsCount}
            </span>
          </div>

          <hr></hr>
          <Comments postID={post._id}></Comments>
          <NewComment postID={post._id}></NewComment>

          <div style={{ height: "20px" }} />
          {canUpdate && <UpdateButton slug={slug} />}
          <div style={{ height: "20px" }} />
          {canUpdate && <DeletePostButton postID={post?._id} />}
        </div>
      </div >
    );
  };

  export default PostDetail;
