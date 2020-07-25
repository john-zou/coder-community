import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { QuestionTab } from './QuestionTab';
import { DiscussionTab } from './DiscussionTab';
import styled from '@emotion/styled';

const useStyles = makeStyles({
  root: {
    width: "80%",
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
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Question" />
          <Tab label="Discussion" />
        </Tabs>
      </Paper>

      {!value && <QuestionTab />}
      {!!value && <DiscussionTab />}
    </>
  );
}
