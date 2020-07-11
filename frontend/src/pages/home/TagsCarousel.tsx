import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./TagsCarousel.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Tag } from "../../store/types";
import { Dictionary } from "@reduxjs/toolkit";
import { fetchPostsByTag } from "../../reducers/postsSlice";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
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
    if (newValue === value) {
      return;
    }
    setValue(newValue);//triggers handleTabChange in Main
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
              return <Tab label="all" {...a11yProps({ idx })} />;
            }
            return <Tab label={tag.name} {...a11yProps({ idx })} />;
          })}
        </Tabs>
      </AppBar>
      {/* <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </div>
  );
}
