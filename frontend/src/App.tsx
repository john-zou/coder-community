import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./containers/footer/Footer";
import Header from "./containers/header/Header";
import CreatePost from "./pages/create_post/CreatePost";
import Home from "./pages/home";
import { DevLogin } from "./pages/login/DevLogin";
import { Messenger } from "./pages/messenger";
import PostDetail from "./pages/post_detail";
import SearchResult from "./pages/search_result/SearchResult";
import Upload from "./pages/video_management/Upload";
import { ViewProfile } from "./pages/view_profile/ViewProfile";
import { LogOut } from "./pages/login/Logout";
import { Experimental } from "./pages/experimental/Experimental";
import { LoginGitHub } from "./pages/login/LoginGitHub";

export type ViewProfileParams = {
  username: string;
};

export type PostDetailParams = {
  slug: string;
};

export default function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/user/:username">
          <ViewProfile />
        </Route>
        <Route path="/create-post">
          <CreatePost />
        </Route>
        <Route exact path="/post">
          <Home />
        </Route>
        <Route path="/post/:slug">
          <PostDetail />
        </Route>
        <Route path="/messages">
          <Messenger />
        </Route>
        <Route path="/result">
          <SearchResult />
        </Route>
        <Route path="/video_management">
          <Upload />
        </Route>
        <Route path="/login/github">
          <LoginGitHub />
        </Route>
        <Route path="/login">
          <DevLogin />
        </Route>
        <Route path="/logout">
          <LogOut></LogOut>
        </Route>
        <Route path="/test">
          <Experimental />
        </Route>
      </Switch>
      {/* <Footer></Footer> */}
    </Router>
  );
}
