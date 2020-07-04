import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInitialTrendingPosts } from '../../actions/trendingPosts';
import RootState, { LoadableIDs } from '../../store';
import { Loading } from '../common/Loading';
import LeftSideBar from './LeftSideBar';
import Main from './Main';
import RightSideBar from './RightSideBar';
import { setTags } from '../../actions/tags';

const useStyles = makeStyles({
  home: {
    paddingTop: "7vh",
    display: "flex",
  },
});

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const trendingPosts = useSelector<RootState, LoadableIDs>(state => state.trendingPosts);

  useEffect(() => {
    dispatch(setInitialTrendingPosts());
    dispatch(setTags());
  }, []);

  if (!trendingPosts.items || trendingPosts.loading) {
    return <Loading />
  }

  return (
    <div className={classes.home}>
      {/* <LeftSideBar /> */}
      <Main />
      <RightSideBar />
    </div>
  );
}
