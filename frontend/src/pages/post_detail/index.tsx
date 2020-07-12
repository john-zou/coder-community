import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PostDetailParams } from '../../App';
import Avatar from '../common/Avatar';
import { Loading } from '../common/Loading';
import { NotFoundError } from '../common/NotFoundError';
import NewComment from './NewComment';
import { RootState } from '../../reducers/rootReducer';
import { fetchPostBySlug } from '../../reducers/postsSlice';
import { Post, User, CurrentLoggedInUser } from '../../store/types';
import { AppDispatch } from '../../store';
import defaultPostFeaturedImage from "../../assets/defaultPostFeaturedImage.jpg";
import HeartIcon from "../../icons/heartIcon.svg";
import HeartIconRed from "../../icons/heartIconRed.svg";
import CommentIcon from "../../icons/commentIcon.svg";
import BookmarkIcon from "../../icons/bookmarkEmpty.svg";
import BookmarkBlack from "../../icons/bookmarkBlack.svg";
import { useLikePost } from "../../hooks/useLikePost";
import { savePost } from '../../reducers/userSlice';
import { Dictionary } from '@reduxjs/toolkit';

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

const Interactions = () => {
  return <> </>
}


const Comments = ({ users, post }: { users: Dictionary<User>, post: Post }) => {
  return <>
    {post.comments.map((comment) => (
      <>
        <Avatar pic={users[post.author].profilePic} title={post.title} subtitle={post.createdAt} extraText="reply"></Avatar>
        <p>{comment}</p>
      </>
    ))}
  </>
}

const PostDetail = () => {
  const { slug } = useParams<PostDetailParams>(); //get the url param to render the appropriate post
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector<RootState, CurrentLoggedInUser>(state => state.user);
  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
  // const userLikedPostIDs = currentUser.likedPosts;

  const { post, author } = useSelector<RootState, { post: Post, author: User }>(state => {
    const postID = state.posts.slugToID[slug];
    if (!postID) {
      return { post: null, author: null };
    }
    const post = state.posts.entities[postID];
    const author = state.users.entities[post.author];
    return { post, author };
  });
  const { postIsLikedByUser, handleToggleLike } = useLikePost(post._id);
  const [postIsSavedByUser, setPostIsSavedByUser] = useState(false);

  const handleToggleSave = () => {
    setPostIsSavedByUser((prev) => !prev);
    dispatch(savePost({ postID: post._id }));
  }

  // const likedByUser = userLikedPostIDs.includes(post._id);
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
      dispatch(fetchPostBySlug({ slug, getAuthor: !author })).catch(setError);
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

  return (
    <div className={classes.root}>
      <div className={classes.postDetail}>
        <img
          src={featuredImg}
          style={{ height: "20em", objectFit: "cover", width: "100%" }} alt="featured"
        />
        <h1>{post.title}</h1>

        <Avatar pic={author.profilePic} title={author.userID} subtitle={post.createdAt} extraText="follow" isButton={true}></Avatar>

        <p>{post.content}</p>

        <div style={{ marginTop: "3em" }}></div>
        <Interactions />
        <div className={classes.interactionsIcons}>
          <span>
            <img className={classes.heartIcon} src={postIsLikedByUser ? HeartIconRed : HeartIcon} alt=""
              onClick={handleToggleLike} />
            &nbsp;&nbsp;{post.likes}
          </span>
          <span>
            <img className={classes.shareIcon} src={CommentIcon} alt="" />
            &nbsp;&nbsp;{post.commentsCount}
          </span>
          <span>
            <img className={classes.shareIcon} src={postIsSavedByUser ? BookmarkBlack : BookmarkIcon} alt=""
              onClick={handleToggleSave} />
            &nbsp;&nbsp;{postIsSavedByUser ? "Saved!" : "Save"}
          </span>
        </div>

        <hr ></hr>
        <NewComment></NewComment>
        <Comments post={post} users={users}></Comments>
        <Link to={`/update-post/${slug}`}>Update</Link>

      </div>
    </div>
  );
};

export default PostDetail;
