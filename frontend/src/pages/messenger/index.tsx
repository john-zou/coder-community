import React, { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import styled from '@emotion/styled';
import { ChatArea } from "./ChatArea";
import { ChatInfo } from "./ChatInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 8vh;
`;

export const Messenger = () => {
  const currConvervationID = useSelector<RootState, string>(state => state.conversations.currentConversationID);
  const isGroupConversation = useSelector<RootState, boolean>(state => state.conversations.isGroupConversation);
  // useEffect(() => {
  //   dispatch(fetchConversations())
  // })

  return (
    <ChatContainer>
      <SideBar />
      <ChatArea />
      <ChatInfo />
    </ChatContainer>
  )
}