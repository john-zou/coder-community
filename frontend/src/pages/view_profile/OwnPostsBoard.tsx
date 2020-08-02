import React, { useState } from "react";
import { CurrentLoggedInUser, User } from "../../store/types";
import styled from '@emotion/styled';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "../home/Card";
import { getFollowingFollowersOfUser } from "../../util/helperFunctions";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Dictionary } from "@reduxjs/toolkit";
import Avatar from "../common/Avatar";
import { SmallCardContainer } from "../daily_challenge/DiscussionTab";
import { TinyButton as ScrollUpButton } from "react-scroll-up-button"; //https://www.npmjs.com/package/react-scroll-up-button

const Container = styled.div`
  width: 816px; // to match the Card.tsx width
  align-content: center;
`

const PostsContainer = styled.div`
  margin-top: 34px;

`

const SavedPostsContainer = PostsContainer;


export function OwnPostsBoard({ user, followingFollowerView }: { user: CurrentLoggedInUser, followingFollowerView?: boolean }) {
  const [tabIdx, setTabIdx] = useState(0);

  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities)

  function child() {
    if (followingFollowerView) {
      if (tabIdx === 0) {
        return (
          <PostsContainer>
            {getFollowingFollowersOfUser(users, user).filter(u => (
              user.followers.includes(u._id)
            )).map((user, index) =>
              <>
                <SmallCardContainer>
                  <Avatar key={index} pic={user.profilePic} title={user.userID} subtitle={user.status} titleSrc={user.userID}></Avatar>
                </SmallCardContainer>
              </>
            )}
          </PostsContainer>
        );
      } else {
        return (
          <SavedPostsContainer>
            {getFollowingFollowersOfUser(users, user).filter(u => (
              user.following.includes(u._id)
            )).map((user, index) =>
              <>
                <SmallCardContainer>
                  <Avatar key={index} pic={user.profilePic} title={user.userID} subtitle={user.status} titleSrc={user.userID}></Avatar>
                </SmallCardContainer>
              </>
            )}
          </SavedPostsContainer>
        );
      }
    }

    else {
      if (tabIdx === 0) {
        return (
          <PostsContainer>
            {user.posts.length > 0 ? user.posts.map(postID => <Card key={postID} postID={postID} />) :
              <h2>You don't have any post yet</h2>
            }
          </PostsContainer>
        );
      } else {
        return (
          <SavedPostsContainer>
            {user.savedPosts.length > 0 ? user.savedPosts.map(postID => <Card key={postID} postID={postID} />) :
              <h2>You have no saved post</h2>}
          </SavedPostsContainer>
        );
      }
    }
  }

  return (
    <Container>
      {!followingFollowerView && <Tabs
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

      {!!followingFollowerView && <Tabs
        value={tabIdx}
        onChange={(_, newValue) => { setTabIdx(newValue) }}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
      >
        <Tab
          label="Followers"
          style={{
            fontFamily: "Roboto",
            textTransform: "none",
            fontWeight: tabIdx === 0 ? "bold" : "lighter",
            fontSize: "1.2rem",
          }}
        />
        <Tab
          label="Following"
          style={{
            fontFamily: "Roboto",
            textTransform: "none",
            fontWeight: tabIdx === 1 ? "bold" : "lighter",
            fontSize: "1.2rem",
          }}
        />
      </Tabs>}
      {child()}

      <ScrollUpButton />
    </Container>
  );
}