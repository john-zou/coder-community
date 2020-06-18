import { combineReducers } from "redux";
import React from "react";

export function posts(state = [], action) {
  return state;
}

// ** New post page
const loadImgReducer = (imgurl = "", action) => {
  if (action.type === "IMG_LOAD") return action.url;
  return imgurl;
};

const loadTitleReducer = (title = "", action) => {
  if (action.type === "TITLE_LOAD") return action.title;
  return title;
}

const loadTextReducer = (text = "", action) => {
  if (action.type === "TEXT_LOAD") return action.text;
  return text;
}

const loadTagReducer = (tags = [], action) => {
  if (action.type === "TAG_LOAD") return [...tags, action.tag];
  return tags;
};

const setPeopleReducer = (people = [], action) => {
  if (action.type === "PEOPLE_SET") return [...people, action.people];
  return people;
};

// ** **
const pageReducer = (page = 0, action) => {
  if (action.type === "PAGE_SELECT") return action.cho;
  return page;
};



export default combineReducers({
  imgurl: loadImgReducer,
  title: loadTitleReducer,
  text: loadTextReducer,
  tags: loadTagReducer,
  people: setPeopleReducer
});
