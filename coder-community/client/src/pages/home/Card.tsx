import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HeartIcon from "../../icons/heartIcon.svg";
import CommentIcon from "../../icons/commentIcon.svg";

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

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.account}>
        <img
          className={classes.accountImg}
          src="https://picsum.photos/200/200"
          alt=""
        />
        <div className={classes.nameTime}>
          <p>
            <span
              style={{
                fontWeight: "bold",
                color: "#5DCBAF",
              }}
            >
              Nick Lee&nbsp;
            </span>
            posted
            <span style={{ fontWeight: "bold" }}> CSS Trick</span>
          </p>
          <p style={{ marginTop: "-0.8em" }}>2 hours ago</p>
        </div>
      </div>

      <div className={classes.imgTitle}>
        <img src="https://picsum.photos/300/200" />
        <div>
          <p style={{ marginLeft: "2em" }}>
            Today I learned that CSS grid is really cool!
          </p>
          <div className={classes.readSave}>
            <h4 style={{ marginRight: "2em", color: "#5D67E9" }}>Read More</h4>
            <h4 style={{ color: "#5D67E9" }}>Save for later</h4>
          </div>
        </div>
      </div>

      <div className={classes.interactions}>
        <p>tags</p>
        <div style={{ display: "flex", flex: 1 }}></div>
        <div className={classes.interactionsIcons}>
          <img className={classes.heartIcon} src={HeartIcon} />
          <p>&nbsp;19</p>
          <img className={classes.commentIcon} src={CommentIcon} />
          <p>&nbsp;25</p>
        </div>
      </div>
    </div>
  );
}
