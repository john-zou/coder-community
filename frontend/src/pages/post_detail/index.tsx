import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { PostDetailParams } from '../../App';
import Avatar from '../common/Avatar';
import { Loading } from '../common/Loading';
import { NotFoundError } from '../common/NotFoundError';
import NewComment from './NewComment';
import UpdateButton from './UpdateButton';
import { RootState } from '../../reducers/rootReducer';
import { fetchPostBySlug } from '../../reducers/postsSlice';
import { CurrentLoggedInUser, Post, User } from '../../store/types';
import { AppDispatch } from '../../store';
import defaultPostFeaturedImage from "../../assets/defaultPostFeaturedImage.jpg";
import { PostsApi } from "../../api";
import { useLikePost } from "../../hooks/useLikePost";
import CommentIcon from "../../icons/commentIcon.svg";
import HeartIcon from "../../icons/heartIcon.svg";
import HeartIconRed from "../../icons/heartIconRed.svg";
import BookmarkEmpty from "../../icons/bookmarkEmpty.svg";
import { Comments } from "./Comments";
import DeletePostButton from "./DeletePostButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  postDetail: {
    paddingTop: "10vh",
    // paddingBottom: "20vh",
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
  // const postID = useSelector<RootState, string>(state => state.posts.currentPost)
  // const slugtoid = useSelector<RootState, Record<string, string>>(state => state.posts.slugToID);
  const { post, author } = useSelector<RootState, { post: Post, author: User }>(state => {
    const postID = state.posts.slugToID[slug];
    if (!postID) {
      return { post: null, author: null };
    }
    const post = state.posts.entities[postID];
    const author = state.users.entities[post.author];
    return { post, author };
  });

  const { postIsLikedByUser, handleToggleLike } = useLikePost(post?._id);

  let canUpdate = false; // if the current user is the author, show an 'update post' button
  if (author !== null) {
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

  if (slug == null || slug === "") {
    return <Redirect to="/" />
  }

  if (!post?.content || !author) {
    return <Loading />
  }

  if (error) {
    return <NotFoundError /> // TODO: add something for server error
  }

  // post has item with content
  // const likedByUser = isLoggedIn && post.likedByUser;

  return (
    <div className={classes.root}>
      <div className={classes.postDetail}>
        <img
          src={featuredImg}
          style={{ height: "20em", objectFit: "cover", width: "100%" }} alt="featured"
        />
        <h1>{post.title}</h1>

        <Avatar pic={author.profilePic} title={author.userID} subtitle={post.createdAt} isPost={true}
          extraText="follow" isButton={true}></Avatar>

        <p>{post.content}</p>

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
          <span>
            <img className={classes.shareIcon} src={BookmarkEmpty} alt="" />
            &nbsp;&nbsp;Save
          </span>
        </div>

        <hr></hr>
        <Comments postID={post._id}></Comments>
        <NewComment postID={post._id}></NewComment>
        <div style={{ height: "20px" }} />
        {canUpdate && <UpdateButton params={slug} />}
        <div style={{ height: "20px" }} />
        {canUpdate && <DeletePostButton postID={post?._id} />}
      </div>
    </div>
  );
};

export default PostDetail;
