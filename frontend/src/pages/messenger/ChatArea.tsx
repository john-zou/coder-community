import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import { useDispatch, useSelector } from "react-redux";
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

const ChatAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 63%;
  height: 80vh;
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

const DirectChatHeader = ({ currentConversation }) => {
  // const user = useSelector<RootState, CurrentLoggedInUser>(state => state.user);
  const userID = useSelector<RootState, string>(state => state.user._id);

  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
  const otherUserID = currentConversation.users.filter((id) => id !== userID)[0];
  const otherUser: User = users[otherUserID];

  return (
    <ChatHeader>
      <div style={{ paddingLeft: "30px", display: "flex", flexDirection: "row", alignItems: "center" }}>
        {/* <img src="https://picsum.photos/200/300" alt="" style={{ width: "5em", height: "5em", borderRadius: "50%" }} /> */}
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
          <H2>{otherUser.name}</H2>
          <p>ViewProfile</p>
        </div>
      </div>
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
  const messagesArr = Object.values(messages).filter((message) => { return currentConversation.messages.includes(message._id) });

  const pendingMessages = useSelector<RootState, PendingMessage[]>(state => state.messages.pendingMessages);
  const pendingMessagesFromCurrConversation = pendingMessages.filter((msg) => msg.conversationID === currentConversationID);

  const [people, setPeople] = useState<string[]>([]);

  return (
    <ChatAreaContainer>
      {!currentConversation && <NewConversation setPeople={setPeople}></NewConversation>}

      {currentConversation && isGroupConversation && <GroupChatHeader conversation={currentConversation} />}
      {currentConversation && isDirectConversation && <DirectChatHeader currentConversation={currentConversation} />}
      {/* {currentConversation && isDirectConversation && isNewMessage && <DirectNewMessageChatHeader />} */}

      {/* {isNewMessage && <DirectNewMessage></DirectNewMessage>} */}
      {/* {!isNewMessage && currentConversation.} */}

      {/* all messages sent by the server */}
      <div style={{ paddingTop: "20px", overflowY: "scroll" }}>
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
                    <Avatar pic={users[msg.author].name} title={users[msg.author].name} isText={true} extraText={moment(msg.createdAt).calendar()}></Avatar>
                    <ChatMessage content={msg.text} isUser={false}></ChatMessage>
                  </div>
                </>}
            </div>)
        })}</div>

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