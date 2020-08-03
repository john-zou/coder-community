import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./TagsCarousel.css";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Tag } from "../../store/types";
import { Dictionary } from "@reduxjs/toolkit";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "50%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export const TagsCarousel = ({ value, setValue }) => {
  const classes = useStyles();
  const tags = useSelector<RootState, Dictionary<Tag>>(state => state.tags.entities);
  const tagsArr = [null].concat(Object.values(tags));

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(newValue);
    console.log(value);
    setValue(newValue);
    console.log(value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {tagsArr.map((tag, idx) => {
            if (idx === 0) {
              return <Tab label="all" {...a11yProps({ idx })} key={idx} />;
            }
            return <Tab label={tag.name} {...a11yProps({ idx })} key={idx} />;
          })}
        </Tabs>
      </AppBar>
    </div>
  );
}
