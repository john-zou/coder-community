import Quill from "quill";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from '@emotion/styled';
import SendIcon from "../../icons/sendIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { SocketContext } from ".";
import { createMessagePending } from "../../reducers/messagesSlice";
import { CreateMessageBodyDto } from "../../api";
import "../../App.css";
import {useSetRecoilState} from "recoil";
import {createConversationStatusAtom} from "./atoms";

const Editor = styled.div`
  max-height: 50%;
  height: fit-content;
  width: 63%;
  position: absolute;
  bottom: 50px;
  background-color: white;
  overflow: scroll;
  font-size: medium;
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 63%;
  background-color: #D3D3D3;
  padding-left: 30px;
`;

export const ChatInput = ({ newMessageSelectedUserIDs }) => {
  const editor = useRef<Quill>(null);//handy for keeping any mutable value around similar to how you’d use instance fields in classes.
  const socket = useContext(SocketContext);
  const userID = useSelector<RootState, string>(state => state.user._id);
  const conversationID = useSelector<RootState, string>(state => state.conversations.currentConversationID);
  const dispatch = useDispatch();
  const setConversationStatus = useSetRecoilState(createConversationStatusAtom);

  const handleSend = useRef(null);

  useEffect(() => {
    handleSend.current = () => {
      // get text from editor
      const text = editor.current.root.innerHTML;

      // if the conversationID is "", then the user is starting a new group chat with anonymous name
      if (conversationID === "") {
        socket.current.emit('newConversation', {otherUsers: newMessageSelectedUserIDs, initialMessage: text});
        // status is pending, this is a special case
        setConversationStatus("pending");
        // when the back end responds, dispatch is called (in socket.on in messenger/index)
      }

      const createMessageBodyDto: CreateMessageBodyDto = {
        userID,
        conversationID,
        // text: editor.current.getText(),
        text,
        createdAt: Date.now(),
      }
      console.log(createMessageBodyDto);
      socket.current.emit('newMessage', createMessageBodyDto);
      dispatch(createMessagePending(createMessageBodyDto));
      editor.current.setText('');
    }
  }, [conversationID]);

  useEffect(() => {
    editor.current = new Quill('#editor', {
      modules: {
        toolbar: '#toolbar',
        keyboard: {
          bindings: {
            enter: {
              key: 13,
              handler: () => handleSend.current()
            }
          }
        }
      },
      placeholder: 'Send message',
      theme: 'snow'  // or 'bubble'
    });
  }, [])

  return (
    <>
      <Editor id="editor">
      </Editor>

      <Toolbar id="toolbar">
        {/* < Add a bold button  */}
        <button className="ql-bold"></button>
        {/* add subscript and superscript buttons */}
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <button className="ql-image"></button>
        <button className="ql-code-block"></button>
        <button className="ql-link"></button>
        <button className="ql-blockquote"></button>
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>

        <div style={{ flex: 1 }}></div>
        <p style={{ fontSize: "small", fontStyle: "italic" }}>
          <strong>Enter</strong> to send&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>Shift</strong> + <strong>Enter</strong> to add a new line&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>

        <div style={{ marginRight: "15px", marginTop: "10px" }}>
          <img src={SendIcon} alt="send" onClick={handleSend.current} />
        </div>
      </Toolbar>
    </>
  )
}