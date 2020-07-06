import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { fetchPostBySlug, fetchPostContentByID } from '../../actions/posts';
import { PostDetailParams } from '../../App';
import { Loadable, Post, RootState } from '../../store';
import Avatar from '../common/Avatar';
import { Loading } from '../common/Loading';
import { NotFoundError } from '../common/NotFoundError';
import NewComment from './NewComment';

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
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector<RootState, boolean>(state => state.isLoggedIn);
  const post = useSelector<RootState, Loadable<Post>>(state => {
    const postID = state.slugs[slug];
    return state.posts[postID];
  });

  useEffect(() => {
    if (!post) {
      dispatch(fetchPostBySlug(slug));
      return;
    }
    if (post.loading || post.error) {
      return;
    }

    if (!post.item.content) {
      dispatch(fetchPostContentByID(post.item._id));
    }
  }, [post, slug, dispatch]);

  if (!post || !post.item || post.loading || !post.item.content) {
    return <Loading />
  }

  if (post.error) {
    return <NotFoundError /> // TODO: add something for server error
  }

  // post has item with content
  const likedByUser = isLoggedIn && post.item.likedByUser;

  return (
    <div className={classes.root}>
      <div className={classes.postDetail}>
        <img
          src={post.item.featuredImg}
          style={{ height: "20em", objectFit: "cover", width: "100%" }} alt="featured"
        />
        <h1>{post.item.title}</h1>

        {/* <Avatar post={post} extraText="follow"></Avatar> */}

        <p>{post.item.content}</p>

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
