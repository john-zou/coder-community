import React, { useEffect, useRef, useState } from "react";
import { SideBar } from "./SideBar";
import styled from '@emotion/styled';
import { ChatArea } from "./ChatArea";
import { ChatInfo } from "./ChatInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import io from 'socket.io-client';
import { Message } from "../../store/types";
import { Dictionary } from "@reduxjs/toolkit";
import { createMessagePending, createMessageSuccess, receiveNewMessage } from "../../reducers/messagesSlice";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 8vh;
`;
export const SocketContext = React.createContext<React.MutableRefObject<SocketIOClient.Socket>>(null);

export const Messenger = () => {
  const userID = useSelector<RootState, string>(state => state.user._id);
  const currConvervationID = useSelector<RootState, string>(state => state.conversations.currentConversationID);
  const isGroupConversation = useSelector<RootState, boolean>(state => state.conversations.isGroupConversation);

  // const messages = useSelector<RootState, Dictionary<Message>>(state => state.messages.entities);
  // const messagesArr = Object.values(messages);

  const dispatch = useDispatch();
  const socket = useRef<SocketIOClient.Socket>(null);
  // console.log(socket.connected);
  useEffect(() => {
    // dispatch(fetchConversations())
    socket.current = io('http://localhost:3001');
    socket.current.on('connection', () => {
      console.log("connected to localhost:3001" + socket.current.connected); // true
      socket.current.emit('getConversationsAndUsers', userID);
    });

    socket.current.on('getConversationsAndUsers', (data: any) => {
      dispatch({
        type: 'getConversationsAndUsers',
        payload: data,
      });
    });

    socket.current.on('newMessage', (response: any) => {//listen for the incoming response(s) from 'newMessage' event
      console.log("before if: " + response);
      // if message is sent by user
      if (socket.current.id === response.id) {
        dispatch(createMessageSuccess(response));
      }
      else {
        dispatch(receiveNewMessage(response));
      }
    })
  }, [])
  const [isNewMessage, setIsNewMessage] = useState(false);

  return (
    <SocketContext.Provider value={socket}>
      <ChatContainer>
        <SideBar setIsNewMessage={setIsNewMessage} />
        <ChatArea isNewMessage={isNewMessage} />
        <ChatInfo />
      </ChatContainer>
    </SocketContext.Provider>
  )
}