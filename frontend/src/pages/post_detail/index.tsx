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

const Comments = () => {
  return <> </>
}

const PostDetail = () => {
  const { slug } = useParams<PostDetailParams>(); //get the url param to render the appropriate post
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector<RootState, CurrentLoggedInUser>(state => state.user);

  const { post, author } = useSelector<RootState, { post: Post, author: User }>(state => {
    const postID = state.posts.slugToID[slug];
    if (!postID) {
      return { post: null, author: null };
    }
    const post = state.posts.entities[postID];
    const author = state.users.entities[post.author];
    return { post, author };
  });

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

        <Avatar pic={author.profilePic} title={author.userID} subtitle={post.createdAt} extraText="follow" isButton={true}></Avatar>

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
        <Link to={`/update-post/${slug}`}>Update</Link>
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
