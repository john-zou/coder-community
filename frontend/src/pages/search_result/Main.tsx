import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card";
import { useSelector } from "react-redux";
import { RootState, TrendingPost } from "../../store/index-old";

const useStyles = makeStyles({
  main: {
    marginTop: "3vh",
    display: "flex",
    flex: 1,
    marginBottom: "0",
    height: "120vh",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
  },
});

//parent: Home
const Main = () => {
  const classes = useStyles();
  const trendingPosts = useSelector<RootState, TrendingPost[]>(
    (state) => state.trendingPosts
  );

  return (
    <div className={classes.main}>
      {trendingPosts.map((post) => (
        <Card trendingPost={post} key={post.postID} />
      ))}
    </div>
  );
};
export default Main;
