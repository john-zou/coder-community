import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import LeftSideBar from './LeftSideBar';
import Main from './Main';
import RightSideBar from './RightSideBar';
import GroupTab from '../group';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const useStyles = makeStyles({
  home: {
    paddingTop: "7vh",
    display: "flex",
  },
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

export default function Home() {
  const classes = useStyles();
  // https://reactrouter.com/web/example/nesting
  // path and url are both for building relative destinations
  // path is for route, url is for link
  const { path } = useRouteMatch();

  return (
    <div className={classes.home}>
      <LeftSideBar />
      <div className={classes.main}>
        <Switch>
          <Route path={`${path}/groups`}>
            <GroupTab />
          </Route>
          <Route exact path={path}>
            <Main />
          </Route>
        </Switch>
      </div>
      <RightSideBar />
    </div>
  );
}
