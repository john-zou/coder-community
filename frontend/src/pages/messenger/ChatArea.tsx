import React from "react";
import styled from '@emotion/styled';
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import Avatar from "../common/Avatar";
import { Dictionary } from "@reduxjs/toolkit";
import { Conversation } from "../../store/types";


const ChatAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 63%;
  height: 92vh;
  background-color: #F5F5F5;
  
`;

const ChatHeader = styled.div`
  height: 15vh;
  border-bottom: 1px solid #C0C0C0;
  box-shadow: 1px 1px 1px #cccccc;
`;

const GroupChatHeader = ({ conversation }) => {
  return (
    <ChatHeader>
      <div style={{ paddingLeft: "30px" }}>
        <h1 style={{ marginBottom: "-0.5px", marginTop: "35px" }}># A Group</h1>
        <div style={{ marginBottom: "20px" }}>
          <span>6 members&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>+ Add member</span>
        </div>
      </div>
    </ChatHeader>)
}

const DirectChatHeader = ({ conversation }) => {
  return (
    <>
      <div style={{ paddingLeft: "20px", paddingTop: "10px" }}>
        <Avatar pic="" title="John Zou"></Avatar>
      </div>
    </>)
}

const ChatMessages = () => {
  return (
    <>
      <div style={{ margin: "5px 30px 0px 30px" }}>
        <Avatar pic="https://picsum.photos/200/200" title="John Zou" subtitle="Ut eu dui ornare, gravida justo finibus, vulputate velit. Cras sed viverra erat. Aliquam urna lacus, vulputate at hendrerit ut, congue quis orci. Suspendisse eget purus at turpis tempus lobortis. In pretium maximus ante at aliquam. Morbi rhoncus ipsum in placerat faucibus. Morbi luctus enim in odio pharetra, quis tempor dolor feugiat. Sed vestibulum non ligula at hendrerit. Sed id felis id odio semper blandit vel ut dui. Maecenas tempus feugiat dolor."></Avatar>
      </div>
      <div style={{ margin: "5px 30px 0px 30px" }}>
        <Avatar pic="https://picsum.photos/200/250" title="John Zou" subtitle="Sed vestibulum non ligula at hendrerit. Sed id felis id odio semper blandit vel ut dui. Maecenas tempus feugiat dolor."></Avatar>
      </div>
      <div style={{ margin: "5px 30px 0px 30px" }}>
        <Avatar pic="https://picsum.photos/200/300" title="John Zou" subtitle="Sed vestibulum non ligula at hendrerit. Sed id felis id odio semper blandit vel ut dui. Maecenas tempus feugiat dolor."></Avatar>
      </div>
    </>)
}

const ChatInput = () => {
  return (<> </>)
}

export const ChatArea = () => {
  const isGroupConversation = useSelector<RootState, boolean>(state => state.conversations.isGroupConversation);
  const conversations = useSelector<RootState, Dictionary<Conversation>>(state => state.conversations.entities);
  const currentConversationID = useSelector<RootState, string>(state => state.conversations.currentConversationID);
  const currentConversation = conversations[currentConversationID];

  return (
    <ChatAreaContainer>

      {isGroupConversation ? <DirectChatHeader conversation={currentConversation}></DirectChatHeader> : <GroupChatHeader conversation={currentConversation}></GroupChatHeader>}

      <ChatMessages></ChatMessages>
      <ChatInput></ChatInput>
      {/* </div> */}
    </ChatAreaContainer >
  )
}