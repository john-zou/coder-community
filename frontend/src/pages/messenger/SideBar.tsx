import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Group, User } from "../../store/types";
import Avatar from "../common/Avatar";
import styled from '@emotion/styled';
import { SearchBar } from "./SearchBar";


const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 17%;
  height: 92vh;
  background-color: white;
  cursor: pointer;
  box-shadow: 0px 0px 20px #cccccc;
  z-index: 1;
`;

export const HeadingText = styled.div`
  font-size: larger;
  font-family: Passion One, cursive;
  color: #707070;
`;

const DirectMessages = ({ users }: { users: User[] }) => {
  return (
    <>
      <HeadingText>DIRECT MESSAGES</HeadingText>
      {users.map((user) => (
        <div>
          <Avatar pic={user.profilePic} title={user.name} />
        </div>
      ))}
    </>)
}

const Groups = ({ groups }) => {
  return (<>
    <div style={{ paddingTop: "20px" }}>
      <HeadingText>GROUPS</HeadingText>
      {groups.map((group) => {
        return <p>#{group}</p>
      })}
    </div>
  </>)
}

export const SideBar = () => {
  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
  const isGroupConversation = useSelector<RootState, boolean>(state => state.conversations.isGroupConversation);
  //replace these groups with group chat later
  const groups = ["Coder Community", "CPSC 436i", "Project 5", "General"]

  const handleToggleDirectOrGroupChatMode = () => {
    // dispatch
  }

  return (
    <SideBarContainer>
      <SearchBar></SearchBar>

      <div style={{ paddingLeft: "30px", marginTop: "35px" }}>
        <span onClick={handleToggleDirectOrGroupChatMode}>
          <DirectMessages users={Object.values(users)}></DirectMessages>
        </span>


        <div onClick={handleToggleDirectOrGroupChatMode}>
          <Groups groups={Object.values(groups)}></Groups>
        </div>
      </div>

    </SideBarContainer >
  )
}