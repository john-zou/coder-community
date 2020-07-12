import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Conversation, User } from "../../store/types";
import Avatar from "../common/Avatar";
import styled from '@emotion/styled';
import { HeadingText } from "./SideBar";

const ChatInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 92vh;
  background-color: #F5F5F5;
  border-left: 1px solid #cccccc;
  box-shadow: 5px 5px 5px 4px #cccccc;
`;

const ChatInfoHeader = styled.div`
  height: 15vh;
  box-shadow: 1px 1px 1px 1px #cccccc;
`;

const H2 = styled.h2`
  margin-bottom: -5px;
  margin-top: 25px;
`;

export const ChatInfo = () => {
  const isGroupConversation = useSelector<RootState, boolean>(state => state.conversations.isGroupConversation);
  const conversations = useSelector<RootState, Dictionary<Conversation>>(state => state.conversations.entities);
  const currentConversationID = useSelector<RootState, string>(state => state.conversations.currentConversationID);
  const currentConversation = conversations[currentConversationID];
  //replace with people in the conversation
  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
  return (
    <ChatInfoContainer>
      <ChatInfoHeader>
        <div style={{ paddingLeft: "20px", paddingTop: "10px" }}>
          {isGroupConversation ? <H2>Chat info</H2> : <H2>Group info</H2>}
          {/* <p>{currentConversation.createdAt}</p> */}
          <p>Created Jul 17, 2020</p>
        </div>
      </ChatInfoHeader>

      {/* <hr></hr> */}
      <div style={{ paddingLeft: "20px", paddingTop: "10px" }}>
        <HeadingText>PEOPLE</HeadingText>
        {Object.values(users).map((user) => (
          <Avatar pic={user.profilePic} title={user.name} />
        ))}
      </div>
    </ChatInfoContainer >
  )
}