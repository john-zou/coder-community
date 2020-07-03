import React from "react";
import { Contact } from "./Contact";
import styled from '@emotion/styled';

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 94vh;
  overflow: scroll;
  cursor: pointer;
  @media (min-width: 580px) {
    width: 320px;
  }
`;

export const ChatList = () => {
  const contacts = [];
  const handleClick = () => {
  };
  return (
    <ChatListContainer>
      {contacts.map((contact) => (
        <Contact key={contact.user_id} />
      ))}
      <div style={{ flex: 1 }}></div>
      <h3
        style={{ margin: "0 auto 1em auto", color: "purple" }}
        onClick={handleClick}
      >
      </h3>
    </ChatListContainer>)
}