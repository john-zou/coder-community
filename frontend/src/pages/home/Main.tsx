import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import { RootState } from '../../reducers/rootReducer';

//parent: Home
const Main = () => {
  // const classes = useStyles();
  const trendingPosts = useSelector<RootState, string[]>(
      (state) => state.posts.trendingPosts
  );

  return (
      <>
        {trendingPosts.map((_id) => (
            <Card postID={_id} key={_id} />
        ))}

      </>
  );
};
export default Main;