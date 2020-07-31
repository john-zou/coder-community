import React, { useState } from "react";
import { CurrentLoggedInUser } from "../../store/types";
import styled from '@emotion/styled';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "../home/Card";

const Container = styled.div`
  width: 816px; // to match the Card.tsx width
  align-content: center;
`

const PostsContainer = styled.div`
  margin-top: 34px;

`

const SavedPostsContainer = PostsContainer;


export function OwnPostsBoard({ user }: { user: CurrentLoggedInUser }) {
  const [tabIdx, setTabIdx] = useState(0);
  const [followingFollwerView, setFollowingFollowerView] = useState(false);


  function child() {
    if (!followingFollwerView) {
      if (tabIdx === 0) {
        return (
          <PostsContainer>
            {user.posts.map(postID => <Card postID={postID} />)}
          </PostsContainer>
        );
      } else {
        return (
          <SavedPostsContainer>
            {user.savedPosts.map(postID => <Card postID={postID} />)}
          </SavedPostsContainer>
        );
      }
    }

    else {
      if (tabIdx === 0) {
        return (
          <PostsContainer>
            {user.posts.map(postID => <Card postID={postID} />)}
          </PostsContainer>
        );
      } else {
        return (
          <SavedPostsContainer>
            {user.savedPosts.map(postID => <Card postID={postID} />)}
          </SavedPostsContainer>
        );
      }
    }
  }

  return (
    <Container>
      {!followingFollwerView && <Tabs
        value={tabIdx}
        onChange={(_, newValue) => { setTabIdx(newValue) }}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
      >
        <Tab
          label="Posts"
          style={{
            fontFamily: "Roboto",
            textTransform: "none",
            fontWeight: tabIdx === 0 ? "bold" : "lighter",
            fontSize: "1.2rem",
          }}
        />
        <Tab
          label="Saved"
          style={{
            fontFamily: "Roboto",
            textTransform: "none",
            fontWeight: tabIdx === 1 ? "bold" : "lighter",
            fontSize: "1.2rem",
          }}
        />
      </Tabs>}

      {!!followingFollwerView && <Tabs
        value={tabIdx}
        onChange={(_, newValue) => { setTabIdx(newValue) }}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
      >
        <Tab
          label="Following"
          style={{
            fontFamily: "Roboto",
            textTransform: "none",
            fontWeight: tabIdx === 0 ? "bold" : "lighter",
            fontSize: "1.2rem",
          }}
        />
        <Tab
          label="Follower"
          style={{
            fontFamily: "Roboto",
            textTransform: "none",
            fontWeight: tabIdx === 1 ? "bold" : "lighter",
            fontSize: "1.2rem",
          }}
        />
      </Tabs>}
      {child()}
    </Container>
  );
}