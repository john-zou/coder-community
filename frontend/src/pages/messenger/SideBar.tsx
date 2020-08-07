import { Dictionary } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Conversation, User } from "../../store/types";
import Avatar from "../common/Avatar";
import styled from '@emotion/styled';
import ComposeIcon from "../../icons/composeIcon.svg";
import { CreateGroupChatModal } from "./CreateGroupChatModal";
import { selectConversation, setNewConversation } from "../../reducers/conversationsSlice";
import { fetchMessagesInConversation } from "../../reducers/messagesSlice";
import { AppDispatch } from "../../store";

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 17%;
  height: 92vh;
  cursor: pointer;
  // box-shadow: 2px 2px 3px #F5F5F5;
  // background-color: white;
  z-index: 1;
`;

export const HeadingText = styled.div`
  font-size: larger;
  font-family: Passion One, cursive;
  color: #707070;
`;

const DirectMessages = () => {
  const dispatch: AppDispatch = useDispatch();
  const conversations = useSelector<RootState, Dictionary<Conversation>>(state => state.conversations.entities);
  const directConv = Object.values(conversations).filter(c => { return c.users.length === 2 });

  const userID = useSelector<RootState, string>(state => state.user._id);
  //these are only the users who have posts
  const usersMap = useSelector<RootState, Dictionary<User>>(state => state.users.entities);

  const handleSelectConversation = (conversationID) => {
    dispatch(selectConversation({ conversationID }));
    dispatch(fetchMessagesInConversation({ conversationID }));
  }

  return (
    <>
      <span><img src={ComposeIcon} alt="" style={{ float: "right" }} onClick={() => {
        dispatch(setNewConversation());
      }} /></span>

      <span><HeadingText>DIRECT MESSAGES</HeadingText></span>

      <div style={{ overflowY: "scroll" }}>
        {directConv.length > 0 && directConv.map((c) => {
          const otherUserID = c.users.filter((id) => id !== userID)[0];
          const otherUser: User = usersMap[otherUserID];
          return (
            <div onClick={() => handleSelectConversation(c._id)} >
              <Avatar isText={true} pic={otherUser.profilePic} title={otherUser.name} />
            </div>)
        })}
      </div>

    </>
  )
}

export const SideBar = () => {
  return (
    <SideBarContainer>
      <div style={{ paddingLeft: "30px", paddingRight: "30px", marginTop: "20%" }}>

        <DirectMessages></DirectMessages>

        <CreateGroupChatModal></CreateGroupChatModal>
      </div>

    </SideBarContainer >
  )
}