import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Conversation, User } from "../../store/types";
import Avatar from "../common/Avatar";
import styled from '@emotion/styled';
import { SearchBar } from "./SearchBar";
import ComposeIcon from "../../icons/composeIcon.svg";
import { CreateGroupChatModal, Groups } from "./CreateGroupChatModal";
import { selectConversation } from "../../reducers/conversationsSlice";
import { convertArrToMap } from "../../util/helperFunctions";
import { fetchMessagesInConversation } from "../../reducers/messagesSlice";
import { AppDispatch } from "../../store";
import { Loading } from "../common/Loading";
import ErrorPage from "../common/ErrorPage";

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 17%;
  height: 92vh;
  // background-color: white;
  cursor: pointer;
  box-shadow: 2px 2px 3px #F5F5F5;
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
  const userID = useSelector<RootState, string>(state => state.user._id);
  //these are only the users who have posts
  const usersMap = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelectConversation = (conversationID) => {
    // console.log(conversationID);
    dispatch(selectConversation({ conversationID }));

    // console.log(conversationID);
    //fetch messages in current conversation
    dispatch(fetchMessagesInConversation({ conversationID }));
  }

  return (
    <>
      <span><img src={ComposeIcon} alt="" style={{ float: "right" }} /></span>
      <span><HeadingText>DIRECT MESSAGES</HeadingText></span>

      <div style={{ overflowY: "scroll" }}>
        {Object.values(conversations).map((c) => {
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
  // const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
  //replace these groups with group chat later

  const handleToggleDirectOrGroupChatMode = () => {
    // dispatch(setConver)
  }

  return (
    <SideBarContainer>
      {/* <SearchBar></SearchBar> */}
      <div style={{ paddingLeft: "30px", paddingRight: "30px", marginTop: "20%" }}>

        <span onClick={handleToggleDirectOrGroupChatMode}>
          <DirectMessages></DirectMessages>
        </span>

        <CreateGroupChatModal></CreateGroupChatModal>
      </div>

    </SideBarContainer >
  )
}