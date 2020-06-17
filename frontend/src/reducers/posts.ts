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

let messages = JSON.stringify({ messages: ["Hi there!", "Hi"] });
const inputReducer = (input = "Your message comes here!", action) => {
  if (action.type === "MESS_INPUT") {
    return action.input;
  }
  return input;
};

const storeReducer = (contents = [], action) => {
  switch (action.type) {
    case "MESS_ADD":
      return [...contents, action.newmess];
    case "MESS_CLEAR":
      return [];
    default:
      return contents;
  }
};

const zoomReducer = (detail = "", action) => {
  if (action.type === "DETAIL_VIEW") return action.content;
  return detail;
};

export default combineReducers({
  imgurl: loadImgReducer,
  tags: loadTagReducer,
  people: setPeopleReducer,

  page: pageReducer,
  input: inputReducer,
  contents: storeReducer,
  detail: zoomReducer,
});
