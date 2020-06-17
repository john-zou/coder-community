import React from "react";
import Header from "./containers/header/Header";
import Footer from "./containers/footer/Footer";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import { ViewProfile } from "./pages/view_profile/ViewProfile";
import CreatePost from "./pages/create_post/CreatePost";

export default function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/u/:username">
          <ViewProfile />
        </Route>
        <Route path="/create-post">
          <CreatePost />
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}
