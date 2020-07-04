import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Main from '../home/Main';
import RightSideBar from './RightSideBar';

const useStyles = makeStyles({
  home: {
    paddingTop: "7vh",
    display: "flex",
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <Main />
      <RightSideBar />
    </div>
  );
}
