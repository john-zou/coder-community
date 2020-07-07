import React from "react";
import styled from '@emotion/styled';
import Avatar from "../common/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { User, Group } from "../../store/types";
import { Dictionary } from "@reduxjs/toolkit";
import PurpleButton from "../common/PurpleButton";

const GroupContainer = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  border-bottom: solid 1px lightgray;
`;

const GroupContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 30px;
`;

const GroupCard = ({ currentGroup, isUserAMember }) => {
  return <div>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Avatar pic={currentGroup.profilePic} title={currentGroup.name} subtitle={currentGroup.description} extraText=""></Avatar>
      <div style={{ flex: 1 }}></div>
      <div style={{ marginTop: "30px" }}>
        {!isUserAMember && <PurpleButton content="Join Group" />}
        {isUserAMember && <PurpleButton content="Leave Group" />}
      </div>
    </div>
  </div>
}
export default function GroupTab() {
  const user = useSelector<RootState, User>(state => state.user);
  const groups = useSelector<RootState, Dictionary<Group>>(state => state.groups.entities);

  console.log("Groups array: ", groups);
  // console.log("User's groups array: ", user.groups);

  const joinedGroupIDs = user.groups;
  const otherGroupsIDs = Object.keys(groups).filter((_id) => {
    return !joinedGroupIDs.includes(_id);
  })

  return (
    <GroupContainer>
      <Header>
        <span><h2>Groups</h2></span>
        <div style={{ flex: 1 }}></div>
        <span style={{ marginTop: "10px", color: "#5D67E9", fontWeight: "bold" }}><p>Create Group</p></span>
      </Header>

      <hr style={{ color: "black" }}></hr>
      <GroupContent>
        {joinedGroupIDs.length > 0 && <>
          <h3>Your groups</h3>
          {joinedGroupIDs.map((_id) => {
            console.log(joinedGroupIDs);
            return <GroupCard currentGroup={groups[_id]} key={_id} isUserAMember={true} />
          })}
        </>}

        {joinedGroupIDs.length === 0 && <h3>Groups you may be interested in</h3>}
        {joinedGroupIDs.length > 0 && <h3>Other groups</h3>}
        {otherGroupsIDs.map((_id) => {
          console.log(otherGroupsIDs);
          return <GroupCard currentGroup={groups[_id]} key={_id} isUserAMember={false} />
        })}
      </GroupContent>
    </GroupContainer >
  );
}