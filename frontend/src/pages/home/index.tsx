import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import LeftSideBar from './LeftSideBar';
import Main from './Main';
import RightSideBar from './RightSideBar';
import GroupTab from '../group';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { TagsCarousel } from './TagsCarousel';

const useStyles = makeStyles({
  home: {
    paddingTop: "7vh",
    display: "flex",
  },
  main: {
    marginTop: "5vh",
    display: "flex",
    flex: 1,
    marginBottom: "1vh",
    height: "86vh",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    overflowX: "hidden",
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <Router>
        <LeftSideBar />
        <div className={classes.main}>
          <TagsCarousel />
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
