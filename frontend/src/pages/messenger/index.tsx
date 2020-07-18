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
export const SocketContext = React.createContext<React.MutableRefObject<SocketIOClient.Socket>>(null);

export const Messenger = () => {
  const userID = useSelector<RootState, string>(state => state.user._id);

  const dispatch = useDispatch();
  const socket = useRef<SocketIOClient.Socket>(null);
  console.log("Messenger index.tsx render");
  useEffect(() => {
    console.log("Messenger index.tsx useEffect (creating new socket)");
    socket.current = io(BackEndBaseUriForWs);
    socket.current.on('connection', () => {
      console.log(`connected to ${BackEndBaseUriForWs}` + socket.current.connected); // true
      // Send server the JWT so it can authenticate ther user
      socket.current.emit('authenticate', { jwt: localStorage.getItem(JwtLocalStorageKey) });
    });

    // The server responds with the same event
    socket.current.on('authenticate', () => {
      console.log("Auth passed! emitting getcConversationsAndUsers...");
      // Upon receiving this event, can now ask for everything else
      socket.current.emit('getConversationsAndUsers', {}); // an empty object is required for auth
    })

    socket.current.on('getConversationsAndUsers', (data: any) => {
      dispatch({
        type: 'getConversationsAndUsers',
        payload: data,
      });
    });

    socket.current.on('newMessage', (response: any) => {//listen for the incoming response(s) from 'newMessage' event
      // if message is sent by user
      if (socket.current.id === response.id) {
        dispatch(createMessageSuccess(response));
      }
      else {
        dispatch(receiveNewMessage(response));
      }
    });

    socket.current.on('newConversation', (data: NewConversationServerToClientDto) => {
      // Client (user) created the new conversation
      if (data.isCreator) {
        dispatch(createConversationSuccess(data.conversation));
        dispatch(fetchMessagesInConversation({ conversationID: data.conversation._id }));
      } else {
        // Conversation was created elsewhere
        dispatch(addConversation(data.conversation))
      }
    })
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      <ChatContainer>
        <SideBar />
        <ChatArea />
        <ChatInfo />
      </ChatContainer>
    </SocketContext.Provider>
  )
}