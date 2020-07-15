<<<<<<< HEAD
import { Dictionary, unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { Conversation, User } from "../../store/types";
=======
import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { User } from "../../store/types";
>>>>>>> master
import Avatar from "../common/Avatar";
import styled from '@emotion/styled';
import { SearchBar } from "./SearchBar";
import ComposeIcon from "../../icons/composeIcon.svg";
import { CreateGroupChatModal, Groups } from "./CreateGroupChatModal";
import { selectConversation } from "../../reducers/conversationsSlice";
<<<<<<< HEAD
import { convertArrToMap } from "../../util/helperFunctions";
import { fetchMessagesInConversation } from "../../reducers/messagesSlice";
import { AppDispatch } from "../../store";
import { Loading } from "../common/Loading";
import ErrorPage from "../common/ErrorPage";
=======
>>>>>>> master

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

<<<<<<< HEAD
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
    setLoading(true);
    dispatch(fetchMessagesInConversation({ conversationID })).then(unwrapResult).then((res) => {
      setLoading(false);
    }).catch(error => {
      setError(error);
      setLoading(false);
    })
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <ErrorPage error={error} />
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
=======
const DirectMessages = ({ users, setIsNewMessage }: { users: User[], setIsNewMessage: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const dispatch = useDispatch();

  return (
    <>
      <span><img src={ComposeIcon} alt="" style={{ float: "right" }} onClick={() => setIsNewMessage(true)} /></span>
      <span><HeadingText>DIRECT MESSAGES</HeadingText></span>

      <div style={{ overflowY: "scroll" }}>
        {users.map((user) => (
          // <div onClick=(() => dispatch(selectConversation({ conversationID: user._id }))) >
          <Avatar isText={true} pic={user.profilePic} title={user.name} />
          // </div>
        ))}
      </div>
    </>)
}

export const SideBar = ({ setIsNewMessage }) => {
  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
>>>>>>> master
  const isGroupConversation = useSelector<RootState, boolean>(state => state.conversations.isGroupConversation);
  //replace these groups with group chat later

  const handleToggleDirectOrGroupChatMode = () => {
    // dispatch(setConver)
  }

  return (
    <SideBarContainer>
      {/* <SearchBar></SearchBar> */}
<<<<<<< HEAD
      <div style={{ paddingLeft: "30px", paddingRight: "30px", marginTop: "20%" }}>

        <span onClick={handleToggleDirectOrGroupChatMode}>
          <DirectMessages></DirectMessages>
=======

      <div style={{ paddingLeft: "30px", paddingRight: "30px", marginTop: "20%" }}>

        <span onClick={handleToggleDirectOrGroupChatMode}>
          <DirectMessages users={Object.values(users)} setIsNewMessage={setIsNewMessage}></DirectMessages>
>>>>>>> master
        </span>

        <CreateGroupChatModal></CreateGroupChatModal>
      </div>

    </SideBarContainer >
  )
}