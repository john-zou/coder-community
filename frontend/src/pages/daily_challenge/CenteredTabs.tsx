import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { QuestionTab } from './QuestionTab';
import { DiscussionTab } from './DiscussionTab';
import styled from '@emotion/styled';
import "../../App.css"

const useStyles = makeStyles({
  root: {
    width: "80%"
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {/* <Paper className={classes.root}> */}
      <Tabs
        value={value}
        onChange={handleChange}
        // indicatorColor="primary"
        textColor="primary"
        centered
        style={{ marginTop: "-8px" }}
      >
        <Tab label="Problem" />
        {/* <Tab label="Discussions" /> */}
      </Tabs>
      {/* </Paper> */}

      {!value && <QuestionTab />}
      {/* {!!value && <DiscussionTab />} */}
    </>
  );
}
