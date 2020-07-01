import React, { useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import styled from '@emotion/styled';

const ChatMessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 85%;
  height: 70%;
  margin: 0 auto;
  overflow-y: scroll;
`;

export const ChatMessages = () => {
  const el = useRef(null);
  const messages = [];
  return (<ChatMessagesContainer ref={el}>
    {messages.map((m, idx) => (
      <ChatMessage message={m} key={idx}></ChatMessage>
    ))}
  </ChatMessagesContainer>)
}