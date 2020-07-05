import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setInitialTrendingPosts } from '../../actions/trendingPosts';
import RootState, { LoadableIDs, SelectedTab, GroupsState } from '../../store';
import { Loading } from '../common/Loading';
import LeftSideBar from './LeftSideBar';
import Main from './Main';
import RightSideBar from './RightSideBar';
import GroupList from '../group';
import Group from '../group';

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
  const selectedTab = useSelector<RootState, string>(state => state.selectedTab);
  const browsingGroups = useSelector<RootState, LoadableIDs>(state => state.browsingGroups);

  useEffect(() => {
    dispatch(setInitialTrendingPosts());
  }, []);

  if (!trendingPosts.items || trendingPosts.loading) {
    return <Loading />
  }

  return (
    <div className={classes.home}>
      <LeftSideBar />
      {selectedTab === SelectedTab.DEFAULT && <Main />}

      {(selectedTab === SelectedTab.GROUPS) && browsingGroups.loading && <Loading />}
      {(selectedTab === SelectedTab.GROUPS) && !browsingGroups.loading && <Group groupIDs={browsingGroups.items} />}

      <RightSideBar />
    </div>
  );
}
