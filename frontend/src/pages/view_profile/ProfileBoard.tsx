import React, { useState } from "react";
import { Tabs, Paper, Tab, makeStyles, Divider } from "@material-ui/core";
import HeartIcon from "../../icons/heartIcon.svg";
import CommentIcon from "../../icons/commentIcon.svg";
import { Post } from "../../initialData";
import { howLongAgo } from "../../util/helpers";
import Avatar from "../common/Avatar";

// For tabs
const Posts = "Posts";
const Saved = "Saved";

const useStyles = makeStyles({
  root: {
    minHeight: "fit-content",
    // minHeight: "20vh",
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
    justifyContent: "center",
  },
});

function postComponent(post, classes) {
  return (
    <>
      <div className={classes.root}>
        <div className={classes.nameTime}>
          <p>
            <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>
              {post.title}
            </span>
          </p>
          <p style={{ marginTop: "-0.8em" }}>{howLongAgo(post.createAt)}</p>
        </div>

        <div className={classes.imgTitle}>
          <img src="https://picsum.photos/300/200" />
          <div>
            <p style={{ marginLeft: "2em" }}>{post.content}</p>
            <div className={classes.readSave}>
              <h4 style={{ marginRight: "2em", color: "#5D67E9" }}>
                Read More
              </h4>
              <h4 style={{ color: "#5D67E9" }}>Save for later</h4>
            </div>
          </div>
        </div>

        <div className={classes.interactions}>
          <p>{post.tags.map((tag) => "#" + tag).join(" ")}</p>
          <div style={{ display: "flex", flex: 1 }}></div>
          <div className={classes.interactionsIcons}>
            <img className={classes.heartIcon} src={HeartIcon} />
            <p>&nbsp;{post.likes}</p>
            <img className={classes.commentIcon} src={CommentIcon} />
            <p>&nbsp;{post.comments.length}</p>
          </div>
        </div>
        <Divider></Divider>
        <div>
          {post.comments.map((comment) => (
            <div>
              <Avatar post={comment} extraText="reply"></Avatar>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

type Props =
  | {
      isUser: true;
      posts: Post[];
      savedPosts: Post[];
    }
  | {
      isUser: false;
      posts: Post[];
    };

export function ProfileBoard(props: Props) {
  const [tabIdx, setTabIdx] = useState(0);
  const classes = useStyles();
  function handleTabChange(_, newValue) {
    setTabIdx(newValue);
  }

  if (props.isUser) {
    const { posts, savedPosts } = props;
    return (
      <>
        <Tabs
          value={tabIdx}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab
            label={Posts}
            style={{
              fontFamily: "roboto",
              textTransform: "none",
              fontWeight: tabIdx === 0 ? "bold" : "lighter",
              fontSize: "1.2rem",
            }}
          />
          <Tab
            label={Saved}
            style={{
              fontFamily: "roboto",
              textTransform: "none",
              fontWeight: tabIdx === 1 ? "bold" : "lighter",
              fontSize: "1.2rem",
            }}
          />
        </Tabs>
        {tabIdx === 0 ? (
          <div style={{ marginTop: "1rem" }}>
            {posts.map((post) => postComponent(post, classes))}
          </div>
        ) : (
          <div style={{ marginTop: "1rem" }}>
            {savedPosts.map((post) => postComponent(post, classes))}
          </div>
        )}
      </>
    );
  } else {
    return (
      <div style={{ marginTop: "2rem" }}>
        {props.posts.map((post) => postComponent(post, classes))}
      </div>
    );
  }
}
