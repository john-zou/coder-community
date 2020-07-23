import React, { useState } from "react";
import { CurrentLoggedInUser, Group } from "../../store/types";
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


export function GroupPostsBoard({ group }: { group: Group }) {
  const [tabIdx, setTabIdx] = useState(0);

  function child() {
    if (tabIdx === 0) {
      return (
        <PostsContainer>
          {group.posts.map(postID => <Card postID={postID} />)}
        </PostsContainer>
      );
    }
  }

  return (
    <Container>
      <Tabs
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
      </Tabs>
      {child()}
    </Container>
  );
}