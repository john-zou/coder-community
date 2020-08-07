import React, { useEffect, useRef, useState } from "react";
import styled from '@emotion/styled';
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import Avatar from "../common/Avatar";
import { Dictionary } from "@reduxjs/toolkit";
import { Conversation, CurrentLoggedInUser, Message, User } from "../../store/types";
import { ChatInfoHeader, H2 } from "./ChatInfo";
import { ChatInput } from "./ChatInput";

import { PendingMessage } from "../../reducers/messagesSlice";
import { ChatMessage } from "./ChatMessage";
import "../../App.css";
import moment from "moment";
import { NewConversation } from "./NewConversation";
import { Loading } from "../common/Loading";
import PurpleButton from "../common/PurpleButton";

const ChatAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 63%;
  height: 80vh;
  background-color: white;
  box-shadow:  -12px -12px 20px #d5d5d5,
             12px 12px 20px #d5d5d5;
`;

export const ChatHeader = styled(ChatInfoHeader)`
  border-bottom: 1px solid #F2F2F2;
`;

const GroupChatHeader = ({ conversation }: { conversation: Conversation }) => {
  return (
    <ChatHeader>
      <div style={{ paddingLeft: "30px" }}>
        <H2>{conversation.name}</H2>
        <span>{conversation.users.length} members&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>+ Add member</span>
      </div>

    </ChatHeader >)
}

const DirectChatHeader = ({ currentConversation }) => {
  const userID = useSelector<RootState, string>(state => state.user._id);

  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
  const otherUserID = currentConversation.users.filter((id) => id !== userID)[0];
  const otherUser: User = users[otherUserID];
  return (
    <ChatHeader>

      <div style={{ paddingLeft: "30px", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
          <H2>{otherUser.name}</H2>
          <p>ViewProfile</p>
        </div>
      </div>
      <div style={{ flex: 1 }}></div>
    </ChatHeader>)
}

export const ChatArea = () => {
  const user = useSelector<RootState, CurrentLoggedInUser>(state => state.user);
  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);

  const isGroupConversation = useSelector<RootState, boolean>(state => state.conversations.isGroupConversation);
  const isDirectConversation = useSelector<RootState, boolean>(state => state.conversations.isDirectConversation);

  const conversations = useSelector<RootState, Dictionary<Conversation>>(state => state.conversations.entities);
  const currentConversationID = useSelector<RootState, string>(state => state.conversations.currentConversationID);
  const currentConversation = conversations[currentConversationID];

  const messages = useSelector<RootState, Dictionary<Message>>(state => state.messages.entities);
  const messagesArr = Object.values(messages).filter((message) => {
    if (currentConversation) {
      return currentConversation.messages.includes(message._id);
    }
  });

  const messagesRef = useRef(null)

  // Scroll to the bottom automatically when there is a new message
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const pendingMessages = useSelector<RootState, PendingMessage[]>(state => state.messages.pendingMessages);
  const pendingMessagesFromCurrConversation = pendingMessages.filter((msg) => msg.conversationID === currentConversationID);

  const [people, setPeople] = useState<string[]>([]);

  const isLoading = useSelector<RootState, boolean>(state => state.conversations.isLoading);
  if (isLoading) {
    return (
      <Loading></Loading>
    )
  }

  return (
    <ChatAreaContainer>
      {!currentConversation && <NewConversation setPeople={setPeople}></NewConversation>}
      {currentConversation && isGroupConversation && <GroupChatHeader conversation={currentConversation} />}
      {currentConversation && isDirectConversation && <DirectChatHeader currentConversation={currentConversation} />}

      {/* all messages sent by the server */}
      {currentConversation &&
        <div ref={messagesRef} style={{ paddingTop: "20px", overflowY: "scroll" }}>
          {messagesArr.map((msg) => {
            return (
              <div style={{ margin: "10px 40px 10px 40px" }}>
                {msg.author === user._id ? (
                  <>
                    <div className="textBlock" style={{ display: "flex", flexDirection: "column" }}>
                      <Avatar pic={user.profilePic} title={user.name} isText={true} extraText={moment(msg.createdAt).calendar()}></Avatar>
                      <ChatMessage content={msg.text} isUser={true} />
                    </div>
                  </>
                ) :
                  <>
                    <div className="textBlock" style={{ display: "flex", flexDirection: "column" }}>
                      <Avatar pic={users[msg.author].profilePic} title={users[msg.author].name} isText={true} extraText={moment(msg.createdAt).calendar()}></Avatar>
                      <ChatMessage content={msg.text} isUser={false}></ChatMessage>
                    </div>
                  </>}
              </div>)
          })}</div>
      }

      {/* pending message from current user */}
      <div style={{ paddingTop: "20px", overflowY: "scroll" }}>
        {pendingMessagesFromCurrConversation.map((pendingMsg) => (
          <div style={{ margin: "10px 40px 10px 40px" }}>
            <Avatar pic={user.profilePic} title={user.name} subtitle={pendingMsg.text} isText={true} />
            <em style={{ fontSize: "smaller", paddingLeft: "50px" }}>Sending...</em>
          </div>
        ))}</div>

      <ChatInput newMessageSelectedUserIDs={people}></ChatInput>

    </ChatAreaContainer >
  )
}