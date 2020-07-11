import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import Footer from "./containers/footer/Footer";
import Header from "./containers/header/Header";
import CreatePost from "./pages/create_post/CreatePost";
import UpdatePost from "./pages/update_post";
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
import { AppDispatch } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingPosts } from "./reducers/postsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Loading } from "./pages/common/Loading";
import ErrorPage from "./pages/common/ErrorPage";
import { RootState } from "./reducers/rootReducer";

export type ViewProfileParams = {
  username: string;
};

export type PostDetailParams = {
  slug: string;
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLoggedIn = useSelector<RootState, boolean>(state => state.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchTrendingPosts({ fetchCount: 0 }))
      .then(unwrapResult).then( //must set dispatch to any to use .then
        () => {
          setLoading(false)
        }
      ).catch(error => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, [isLoggedIn]);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/user/:username">
          <ViewProfile />
        </Route>
        <Route path="/create-post">
          <CreatePost />
        </Route>
        <Route path="/update-post/:slug">
          <UpdatePost />
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
        <Route path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home"></Redirect>
        </Route>
      </Switch>
      {/* <Footer></Footer> */}
    </Router>
  );
}
