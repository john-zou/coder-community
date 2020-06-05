import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import { ViewProfile } from "./pages/view_profile/ViewProfile";
import { CreatePost } from "./pages/create_post/CreatePost";
import Header from "./containers/header/header";
import Footer from "./containers/footer/footer";

function App() {
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

export default App;
