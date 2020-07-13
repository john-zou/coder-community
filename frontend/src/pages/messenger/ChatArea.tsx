import React, { useState } from "react";
import styled from '@emotion/styled';
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import Avatar from "../common/Avatar";
import { Dictionary } from "@reduxjs/toolkit";
import { Conversation, Message } from "../../store/types";
import { ChatInfoHeader, H2 } from "./ChatInfo";
import { ChatInput } from "./ChatInput";
import { DirectNewMessage, DirectNewMessageChatHeader } from "./DirectNewMessage";


const ChatAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 63%;
  height: 92vh;
  background-color: white;
`;

export const ChatHeader = styled(ChatInfoHeader)`
  border-bottom: 1px solid #F2F2F2;
`;

const GroupChatHeader = ({ conversation }) => {
  return (
    <ChatHeader>
      <div style={{ paddingLeft: "30px" }}>
        <H2># Coder Community</H2>
        <span>6 members&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>+ Add member</span>
        {/* </div> */}
      </div>
    </ChatHeader >)
}

const DirectChatHeader = ({ conversation }) => {
  return (
    <>
      <div style={{ paddingLeft: "30px", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <img src="https://picsum.photos/200/300" alt="" style={{ width: "5em", height: "5em", borderRadius: "50%" }} />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
          <H2>John Zou</H2>
          <p>ViewProfile</p>
        </div>
      </div>
    </>)
}

const ChatMessages = ({ conversation }: { conversation: Conversation }) => {
  return (
    <div style={{ paddingTop: "25px", overflowY: "scroll" }}>
      {conversation.messages.map((message) => (
        <div style={{ margin: "5px 30px 5px 30px" }}>
          <Avatar isText={true} pic={message.} title="John Zou" subtitle="Sed vestibulum non ligula at hendrerit. Sed id felis id odio semper blandit vel ut dui. Maecenas tempus feugiat dolor."></Avatar>
        </div>
      ))}
    </div>
  )
}

export const ChatArea = ({ isNewMessage }) => {
  const isGroupConversation = useSelector<RootState, boolean>(state => state.conversations.isGroupConversation);
  const isDirectConversation = useSelector<RootState, boolean>(state => state.conversations.isDirectConversation);

  const conversations = useSelector<RootState, Dictionary<Conversation>>(state => state.conversations.entities);
  const currentConversationID = useSelector<RootState, string>(state => state.conversations.currentConversationID);
  const currentConversation = conversations[currentConversationID];
  const messages = useSelector<RootState, Dictionary<Message>>(state => state.messages.)

  return (
    <ChatAreaContainer>
      {isGroupConversation && <GroupChatHeader conversation={currentConversation} />}
      {isDirectConversation && !isNewMessage && <DirectChatHeader conversation={currentConversation} />}
      {isDirectConversation && isNewMessage && <DirectNewMessageChatHeader />}

      {isNewMessage && <DirectNewMessage></DirectNewMessage>}
      {!isNewMessage && currentConversation.}

      <ChatInput></ChatInput>

    </ChatAreaContainer >
  )
}