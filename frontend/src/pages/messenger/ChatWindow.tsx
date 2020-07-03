import React from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import styled from '@emotion/styled';

const ChatWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 94vh;
`

export const ChatWindow = () => {
  return (
    <ChatWindowContainer>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </ChatWindowContainer>)
}