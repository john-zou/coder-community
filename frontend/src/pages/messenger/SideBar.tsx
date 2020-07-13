import { Dictionary } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers/rootReducer";
import { User } from "../../store/types";
import Avatar from "../common/Avatar";
import styled from '@emotion/styled';
import { SearchBar } from "./SearchBar";
import ComposeIcon from "../../icons/composeIcon.svg";
import { CreateGroupChatModal, Groups } from "./CreateGroupChatModal";
import { selectConversation } from "../../reducers/conversationsSlice";

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

const DirectMessages = ({ users, setIsNewMessage }: { users: User[], setIsNewMessage: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const dispatch = useDispatch();
  return (
    <>
      <span><img src={ComposeIcon} alt="" style={{ float: "right" }} onClick={() => setIsNewMessage(true)} /></span>
      <span><HeadingText>DIRECT MESSAGES</HeadingText></span>

      <div style={{ overflowY: "scroll" }}>
        {users.map((user) => (
          <div onClick=(() => dispatch(selectConversation({ conversationID: user._id }))) >
          <Avatar isText={true} pic={user.profilePic} title={user.name} />
          </div>
        ))}
    </div>
    </>)
}

export const SideBar = ({ setIsNewMessage }) => {
  const users = useSelector<RootState, Dictionary<User>>(state => state.users.entities);
  const isGroupConversation = useSelector<RootState, boolean>(state => state.conversations.isGroupConversation);
  //replace these groups with group chat later

  const handleToggleDirectOrGroupChatMode = () => {
    // dispatch(setConver)
  }

  return (
    <SideBarContainer>
      {/* <SearchBar></SearchBar> */}

      <div style={{ paddingLeft: "30px", paddingRight: "30px", marginTop: "20%" }}>

        <span onClick={handleToggleDirectOrGroupChatMode}>
          <DirectMessages users={Object.values(users)} setIsNewMessage={setIsNewMessage}></DirectMessages>
        </span>

        <CreateGroupChatModal></CreateGroupChatModal>
      </div>

    </SideBarContainer >
  )
}