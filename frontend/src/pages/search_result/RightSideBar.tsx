import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TagCard from "./TagCard";

const useStyles = makeStyles({
  rightbar: {
    width: "20vw",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    paddingLeft: "2em",
    paddingTop: "5vh",
    marginRight: "5vw",
  },
  title: {
    fontSize: "1em"
  },
  search: {
    display: "flex",
    flexDirection: "column",
    height: "40vh",
    overflowY: "auto",
  },
  searchoption: {
    fontSize: "1em"
  },
  filter: {
    height: "56vh",
    display: "flex",
  },
  display: {
    fontWeight: "bold",
    marginBottom: "1em",
  },
  filtertags: {
  }
});

export default function RightSideBar() {
  const classes = useStyles();

  return (
    <div className={classes.rightbar}>
      <div className={classes.search}>
        <p className={classes.title}># Search</p>
        <hr className={classes.display}></hr>
        <div className={classes.searchoption}>
          <input type="checkbox" checked />
          <label>posts</label>
          <br></br>
          <input type="checkbox" />
          <label>users</label>
          <br></br>
          <input type="checkbox" />
          <label>videos</label>
        </div>
      </div>
      <div className={classes.filter}>
        <p className={classes.title}># Filter by</p>
        <hr className={classes.display}></hr>
        <div className={classes.filtertags}>
          <TagCard />
        </div>
      </div>
    </div>
  );
}
