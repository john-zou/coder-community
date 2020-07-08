import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import LeftSideBar from './LeftSideBar';
import Main from './Main';
import RightSideBar from './RightSideBar';
import GroupTab from '../group';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

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
  const history = createBrowserHistory();

  return (
    <div className={classes.home}>
      <Router>
        <LeftSideBar />
        <div className={classes.main}>
          <Switch>
            <Route path="/home/groups" component={GroupTab}>
            </Route>
            <Route exact path="/home" component={Main}>
              <Main />
            </Route>
          </Switch>
        </div>
        <RightSideBar />

      </Router>
    </div>
  );
}
