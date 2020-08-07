import { Dictionary } from "@reduxjs/toolkit";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Conversation, User } from "../../store/types";
import Avatar from "../common/Avatar";
import styled from '@emotion/styled';
import { HeadingText } from "./SideBar";
import { ChatHeader } from "./ChatArea";
import moment from "moment";
import { FlexSpace } from "../view_profile/OwnProfile";
import CodeTogetherSvg from "../../assets/code_together.svg";
import { SocketContext } from "../../App";
import { createMessagePending } from "../../reducers/messagesSlice";
import { AppDispatch } from "../../store";
import { CreateMessageBodyDto } from "../../api";
import { BackEndBaseUri } from "../../constants";
import { v4 as uuidv4 } from 'uuid';
import PurpleButton from "../common/PurpleButton";


const ChatInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 92vh;
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
  const socketRef = useContext(SocketContext);
  const dispatch = useDispatch();
  const userID = useSelector<RootState, string>(state => state.user?._id);

  const handleCodeCollabClick = () => {
    const roomURL = `${BackEndBaseUri}code-together/${uuidv4()}`;
    const message = `<p>Let's <b>Code Together</b>! <a  href="${roomURL}">Click here</a>`
    const dto: CreateMessageBodyDto = {
      conversationID: currentConversationID,
      createdAt: Date.now(),
      text: message,
      userID
    }
    socketRef.current.emit('newMessage', dto);
    dispatch(createMessagePending(dto));
  }

  return (!currentConversation ? <></> :
    <ChatInfoContainer>
      <ChatInfoHeader>
        <div style={{ paddingLeft: "30px" }}>
          {isGroupConversation ? <H2>Group info</H2> : <H2>Chat info</H2>}
          <span>Created {moment(currentConversation.createdAt).format("ll")}</span>
        </div>
      </ChatInfoHeader>

      <div style={{ paddingLeft: "30px", paddingTop: "10px" }}>
        <HeadingText>PEOPLE</HeadingText>
        {currentConversation.users.map((uID) => (
          <Avatar isText={true} pic={users[uID].profilePic} title={users[uID].name} />
        ))}
      </div>
      <FlexSpace />
      <div>
        <img src={CodeTogetherSvg} alt="code together" width="60%" style={{ paddingLeft: "20%", paddingBottom: "4vh" }} />
        <div style={{ paddingBottom: "4vh", display: "flex" }}>
          <FlexSpace />
          <PurpleButton handleClick={handleCodeCollabClick} content={"Make Code Collaboration Room"} fitContent />
          <FlexSpace />
        </div>
      </div>
    </ChatInfoContainer >
  )
}