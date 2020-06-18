import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
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
});

const Avatar = ({ post, extraText }) => {
  const classes = useStyles();
  return (
    <div className={classes.account}>
      <img className={classes.accountImg} src={post.authorImg} alt="" />
      <div className={classes.nameTime}>
        <p>
          <span
            style={{
              fontWeight: "bold",
              color: "#5DCBAF",
            }}
          >
            {post.authorName}&nbsp;&nbsp;&nbsp;
          </span>
          <span style={{ color: "#5D67E9" }}>{extraText}</span>
        </p>
        <p style={{ marginTop: "-0.8em" }}>{post.createdAt}</p>
      </div>
    </div>
  );
};

export default Avatar;
