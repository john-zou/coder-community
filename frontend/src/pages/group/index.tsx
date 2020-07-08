import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import Avatar from "../common/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { User, Group } from "../../store/types";
import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { Loading } from "../common/Loading";
import ErrorPage from "../common/ErrorPage";
import { fetchGroups } from "../../reducers/groupsSlice";

const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function GroupTab() {
  const user = useSelector<RootState, User>(state => state.user);
  const groups = useSelector<RootState, Dictionary<Group>>(state => state.groups.entities);
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("hellooooo");
    setLoading(true);
    dispatch(fetchGroups()).then(unwrapResult).then(() => {
      setLoading(false);

    }).catch(err => {
      setLoading(false);
      setError(err);
    })
  }, []);

  if (loading || !groups) {
    return <Loading />
  }
  if (error) {
    return <ErrorPage error={error} />
  }

  // console.log("User's groups array: ", groups);
  // console.log("User's groups array: ", user.groups);

  const joinedGroupIDs = user.groups;
  const otherGroupsIDs = Object.keys(groups).filter((_id) => {
    return !joinedGroupIDs.includes(_id);
  })

  return (
    <div>
      <Header>
        <span><h2>Groups</h2></span>
      </Header>

      <Container>
        {joinedGroupIDs.length > 0 && <>
          <h2>Your groups</h2>
          {joinedGroupIDs.map((_id) => {
            console.log(joinedGroupIDs);
            const currentGroup = groups[_id];
            return <Avatar pic={currentGroup.profilePic} title={currentGroup.name} subtitle={currentGroup.description} extraText=""></Avatar>
          })}
        </>}

        {joinedGroupIDs.length === 0 && <h2>Groups you may be interested in</h2>}
        {joinedGroupIDs.length > 0 && <h2>Other groups</h2>}
        {otherGroupsIDs.map((_id) => {
          const currentGroup = groups[_id];
          return <Avatar pic={currentGroup.profilePic} title={currentGroup.name} subtitle={currentGroup.description} extraText=""></Avatar>
        })}
      </Container>
    </div >
  );
}