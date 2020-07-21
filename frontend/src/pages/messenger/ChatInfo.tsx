import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Conversation, User } from "../../store/types";
import Avatar from "../common/Avatar";
import styled from '@emotion/styled';
import { HeadingText } from "./SideBar";
import { ChatHeader } from "./ChatArea";

const ChatInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 92vh;
  box-shadow: 1px 1px 2px 4px #F5F5F5;
`;

export const H2 = styled.h2`
  margin-bottom: -1px;
`;

export const ChatInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 15vh;
`;
export const ChatInfo = () => {
  const isGroupConversation = useSelector<RootState, boolean>(state => state.conversations.isGroupConversation);
  const conversations = useSelector<RootState, Dictionary<Conversation>>(state => state.conversations.entities);
  const currentConversationID = useSelector<RootState, string>(state => state.conversations.currentConversationID);
  const currentConversation = conversations[currentConversationID];
  //replace with people in the conversation
  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);

  return (!currentConversation? <></> :
    <ChatInfoContainer>
      <ChatInfoHeader>
        <div style={{ paddingLeft: "30px" }}>
          {isGroupConversation ? <H2>Group info</H2> : <H2>Chat info</H2>}
           {/*<p>{currentConversation.createdAt}</p>*/}
          <span>Created Jul 17, 2020</span>
        </div>
      </ChatInfoHeader>

      {/* <hr></hr> */}
      <div style={{ paddingLeft: "30px", paddingTop: "10px" }}>
        <HeadingText>PEOPLE</HeadingText>
        {currentConversation.users.map((uID) => (
          <Avatar isText={true} pic={users[uID].profilePic} title={users[uID].name} />
        ))}
      </div>
    </ChatInfoContainer >
  )
}