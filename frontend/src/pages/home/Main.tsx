import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

import { LoadableIDs, RootState } from '../../store';
import Card from './Card';

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
  const trendingPosts = useSelector<RootState, LoadableIDs>(
    (state) => state.trendingPosts
  );

  return (
    <div className={classes.main}>
      {trendingPosts.items.map((_id) => (
        <Card postID={_id} key={_id} />
      ))}
    </div>
  );
};
export default Main;
