import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { PostDetailParams } from '../../App';
import Avatar from '../common/Avatar';
import { Loading } from '../common/Loading';
import { NotFoundError } from '../common/NotFoundError';
import NewComment from './NewComment';
import { RootState } from '../../reducers/rootReducer';
import { fetchPostBySlug, fetchPostContentByID } from '../../reducers/postsSlice';
import { Post } from '../../store/types';

// import { useParams } from "react-router-dom";
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
  return <h1>TODO</h1>
}

const Comments = () => {
  return <h1>TODO</h1>
}

const PostDetail = () => {
  const { slug } = useParams<PostDetailParams>(); //get the url param to render the appropriate post

  const classes = useStyles();
  const dispatch: any = useDispatch();
  // const history = useHistory();
  // const isLoggedIn = useSelector<RootState, boolean>(state => state.isLoggedIn);
  const post = useSelector<RootState, Post>(state => {
    const postID = state.posts.slugToID[slug];
    return state.posts[postID];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);
    if (!post) {
      dispatch(fetchPostBySlug(slug));
      return;
    }

    if (!post.content) {
      dispatch(fetchPostContentByID(post._id));
    }
  }, [post, slug, dispatch]);

  if (loading || !post || !post.content) {
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
          src={post.featuredImg}
          style={{ height: "20em", objectFit: "cover", width: "100%" }} alt="featured"
        />
        <h1>{post.title}</h1>

        <Avatar post={post} extraText="follow"></Avatar>

        <p>{post.content}</p>

        <Interactions />
        {/* <div className={classes.interactionsIcons}>
          <span>
            <img className={classes.heartIcon} src={likedByUser ? HeartIconRed : HeartIcon} alt="" onClick={() => {
              dispatch(likePost(post, !post.item.likedByUser));
            }} />
            &nbsp;&nbsp;{post.item.likesCount}
          </span>
          <span>
            <img className={classes.shareIcon} src={CommentIcon} alt="" />
            &nbsp;&nbsp;{post.item.comments.length}
          </span>
          <span>
            <img className={classes.shareIcon} src={ShareIcon} alt="" />
            &nbsp;&nbsp;Share
          </span>
        </div> */}

        <NewComment></NewComment>
        <Comments></Comments>
        {/* {post.comments.map((comment) => (
        <>
          <Avatar post={comment} extraText="reply"></Avatar>
          <p>{comment.comment}</p>
        </>
      ))} */}

      </div>
    </div>
  );
};

export default PostDetail;
