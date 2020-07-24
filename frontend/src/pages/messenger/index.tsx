import React, { useEffect, useRef } from "react";
import { SideBar } from "./SideBar";
import styled from '@emotion/styled';
import { ChatArea } from "./ChatArea";
import { ChatInfo } from "./ChatInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import io from 'socket.io-client';
import { createMessageSuccess, fetchMessagesInConversation, receiveNewMessage } from "../../reducers/messagesSlice";
import { BackEndBaseUriForWs, JwtLocalStorageKey } from "../../constants";
import { addConversation, createConversationSuccess } from "../../reducers/conversationsSlice";
import { NewConversationServerToClientDto } from "../../ws-dto/messages/messenger.ws.dto";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 8vh;
`;

export const Messenger = () => {
  // const userID = useSelector<RootState, string>(state => state.user._id);
  // const dispatch = useDispatch();

  return (
      <ChatContainer>
        <SideBar />
        <ChatArea />
        <ChatInfo />
      </ChatContainer>
  )
}