import React, {useEffect, useMemo, useState} from "react";
import {CurrentLoggedInUser, Group, Post, User} from "../../store/types";
import styled from '@emotion/styled';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "../home/Card";
import {AppDispatch} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {MemberCard} from "./MemberCard";
import {fetchGroupMembersAndPosts} from "../../reducers/groupsSlice";
import {RootState} from "../../reducers/rootReducer";
import {Dictionary, unwrapResult} from "@reduxjs/toolkit";
import {Loading} from "../common/Loading";

const Container = styled.div`
  width: 816px; // to match the Card.tsx width
  align-content: center;
`

const MembersContainer = styled.div`
  margin-top: 34px;

`
const PostsContainer = MembersContainer;


export function GroupProfileTabs({ group }: { group: Group }) {
  const [loading, setLoading] = useState(true);
  const [tabIdx, setTabIdx] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
  const posts = useSelector<RootState, Dictionary<Post>>(state => state.posts.entities);

  useEffect(() => {
    dispatch(fetchGroupMembersAndPosts(group._id))
      .then(unwrapResult)
      .then(() => {setLoading(false)})
      .catch(console.log);
  }, [group._id]);

  const adminsToRender = useMemo<User[]>(() => {
    if (!loading) {
      const ret = [];
      group.admins.forEach(userID => {
        ret.push(users[userID]);
      });
      return ret;
    } else {
      return [];
    }
  }, [loading]);
  const usersToRender = useMemo<User[]>(() => {
    if (!loading) {
      const ret = [];
      group.users.forEach(userID => {
        ret.push(users[userID]);
      });
      return ret;
    } else {
      return [];
    }
  }, [loading]);

  if (loading) {
    return <Loading />
  }

  function child() {
    if (tabIdx === 0) {
      return (
        <MembersContainer>
          {adminsToRender.map(user => <MemberCard user={user} isAdmin/>)}
          {usersToRender.map(user => <MemberCard user={user} />)}
        </MembersContainer>
      );
    } else if (tabIdx === 1) {
      return (
        <PostsContainer>
          {group.posts.map(postID => <Card postID={postID}/>)}
        </PostsContainer>
      )
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
          label="Members"
          style={{
            fontFamily: "Roboto",
            textTransform: "none",
            fontWeight: tabIdx === 0 ? "bold" : "lighter",
            fontSize: "1.2rem",
          }}
        />
        <Tab
          label="Posts"
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